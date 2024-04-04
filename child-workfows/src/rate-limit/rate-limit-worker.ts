import Hatchet, { Workflow } from '@hatchet-dev/typescript-sdk';
import { RateLimitDuration } from '@hatchet-dev/typescript-sdk/protoc/workflows';

// instantiate a new hatchet client
const hatchet = Hatchet.init({
  log_level: 'OFF',
});

const batch: Workflow = {
  id: 'batch-work',
  description: 'plan work for processing a set of requests',
  on: {
    event: 'batch:create',
  },
  steps: [
    {
      name: 'fanout-work',
      timeout: '1d',
      run: async (ctx) => {

        const accounts = Array.from({ length: 10 }, (_, i) => `account-${i}`);

        const children = accounts.map((account) => ctx.spawnWorkflow<ProcessAccount>(processAccount.id, {
          account
        }).result());

        const results = await Promise.all(children)

        return {
          numAccounts: results.length,
        }
      },
    },
  ],
};

interface ProcessAccount {
  'process': {
    'results': string
  }
}

const processAccount: Workflow = {
  id: 'process-account',
  description: 'do some work on an account',
  on: {
    event: 'account:process',
  },
  timeout: '1d',
  steps: [
    {
      name: 'proccess-account',
      rate_limits:[{
        key: 'external-api-1',
        units: 1
      }],
      run: async (ctx) => {
        const { account } = ctx.workflowInput()
        return {
           result: Math.random()
        };
      },
    },

  ],
};

async function main() {
  const worker = await hatchet.worker('batch-worker');
  await worker.registerWorkflow(batch);
  await worker.registerWorkflow(processAccount);
  
  hatchet.admin.put_rate_limit('external-api-1', 1, RateLimitDuration.SECOND);

  worker.start();
}

main();
