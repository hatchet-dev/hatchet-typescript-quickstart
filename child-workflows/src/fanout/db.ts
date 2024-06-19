import { LocalIndex } from 'vectra';
import path from 'path';
import { OpenAI } from 'openai';
import axios, { AxiosError } from 'axios';

// instantiate a new vectra local index
const index = new LocalIndex(path.join(__dirname, '..', 'index'));

// instantiate a new openai client
const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function vectra() {
  if (!(await index.isIndexCreated())) {
    await index.createIndex();
  }
  return index;
}

async function getVector(text: string) {
  try {
    if (!text) {
      return [];
    }
    const response = await openAi.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error((error as AxiosError).response?.data);
      // Access to config, request, and response
    } else {
      console.error(error);
      // Just a stock error
    }
  }
}

export async function addItem(text: string) {
  const vector = await getVector(text);
  await (
    await vectra()
  ).insertItem({
    vector,
    metadata: { text },
  });
  return vector;
}

export async function query(text: string) {
  const vector = await getVector(text);
  if (!vector) {
    return [];
  }
  const results = await (await vectra()).queryItems(vector, 3);
  return results
    .map((result) => ({ text: result.item.metadata.text, score: result.score }))
    .filter((result) => !!result.score);
}
