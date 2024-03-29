import Hatchet, { Workflow } from '@hatchet-dev/typescript-sdk';
import fs from 'fs';
import path from 'path';
import { addItem, query } from './db';

// instantiate a new hatchet client
const hatchet = Hatchet.init({
  log_level: 'OFF',
});

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const planWork: Workflow = {
  id: 'plan-work',
  description: 'plan work for processing a set of documents',
  on: {
    event: 'document:create',
  },
  steps: [
    {
      name: 'fanout-work',
      run: async (ctx) => {
        // find all documents in ./files
        // for each document, create a new event
        const documentsDir = path.join(__dirname, 'files');

        const documents = fs.readdirSync(documentsDir).filter(file => {
          return fs.statSync(path.join(documentsDir, file)).isFile();
        });

        const children = documents.map((document) => ctx.spawnWorkflow<{
          'chunk-page': {
            'results': string
          }
        }>('process-page', {
          path: path.join(documentsDir, document)
        }).result());

        const results = await Promise.all(children)

        return {
          numDocuments: results.length,
        }
      },
    },
    {
      name: 'notify-user',
      parents: ['fanout-work'],
      run: (ctx) => {
        return { step2: 'step2' };
      },
    },
  ],
};

const processPage: Workflow = {
  id: 'process-page',
  description: 'load a page from a document and chunk it into paragraphs',
  on: {
    event: 'page:create',
  },
  steps: [
    {
      name: 'load-page',
      run: async (ctx) => {
        const { path } = ctx.workflowInput()
        const contents = fs.readFileSync(path, 'utf-8');
        return {
           contents
        };
      },
    },
    {
      name: 'chunk-page',
      parents: ['load-page'],
      run: async (ctx) => {
        const { contents } = ctx.stepOutput('load-page')
        const paragraphs = (contents as string).split('\n\n');

        const children = paragraphs.map((paragraph) => ctx.spawnWorkflow<
        {
          'vectorize-paragraph': {
            'result': string
          }
        }
        >('process-paragraph', {
          paragraph
        }).result());

        const vectors = await Promise.all(children)

        return { results: vectors.map(v => v['vectorize-paragraph']['result']) };
      },
    },
  ],
};

const processParagraph: Workflow = {
  id: 'process-paragraph',
  description: 'vectorize a paragraph of text',
  on: {
    event: 'paragraph:create',
  },
  steps: [
    {
      name: 'vectorize-paragraph',
      retries: 3,
      run: async (ctx) => {
        const { paragraph } = ctx.workflowInput()
        const vector = await addItem(paragraph as string)
        return { result: vector || [] };
      },
    },
  ],
};

const search: Workflow = {
  id: 'search-paragraphs',
  description: 'find relevant paragraphs in the index',
  on: {
    event: 'paragraph:search',
  },
  steps: [
    {
      name: 'search-index',
      run: async (ctx) => {
        const { text } = ctx.workflowInput()
        const results = await query(text as string)
        return { results };
      },
    },
  ],
};

async function main() {
  const worker = await hatchet.worker('batch-worker');
  await worker.registerWorkflow(planWork);
  await worker.registerWorkflow(processPage);
  await worker.registerWorkflow(processParagraph);
  await worker.registerWorkflow(search);
  worker.start();
}

main();
