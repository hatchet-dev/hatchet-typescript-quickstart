import Hatchet, { AdminClient, Context } from '@hatchet-dev/typescript-sdk';
import { CreateWorkflowVersionOpts } from '@hatchet-dev/typescript-sdk/protoc/workflows';

const hatchet = Hatchet.init();

const admin = hatchet.admin as AdminClient;

type CustomUserData = {
  example: string;
};

const opts: CreateWorkflowVersionOpts = {
  name: 'api-workflow',
  description: 'My workflow',
  version: '',
  eventTriggers: [],
  cronTriggers: [],
  scheduledTriggers: [],
  concurrency: undefined,
  jobs: [
    {
      name: 'my-job',
      description: 'Job description',
      steps: [
        {
          readableId: 'custom-step',
          action: `default:step-one`,
          timeout: '60s',
          inputs: '{}',
          parents: [],
          userData: `{
            "example": "value"
          }`,
          retries: 0,
          rateLimits: [],
        },
      ],
    },
  ],
};

type StepOneInput = {
  key: string;
};

async function main() {
  await admin.putWorkflow(opts);

  const { rows } = await admin.listWorkflows();

  for (const row of rows || []) {
    console.log(row);
  }

  const worker = await hatchet.worker('example-worker');

  worker.registerAction(
    'default:step-one',
    async (ctx: Context<StepOneInput, CustomUserData>) => {
      const setData = ctx.userData();
      console.log('executed step1!', setData);
      return { step1: 'step1' };
    },
  );

  await hatchet.admin.runWorkflow('api-workflow', {});

  worker.start();
}

main();
