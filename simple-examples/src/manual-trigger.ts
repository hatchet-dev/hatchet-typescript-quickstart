import Hatchet from '@hatchet-dev/typescript-sdk';

const hatchet = Hatchet.init();

async function main() {
  const workflowRunId = await hatchet.admin.run_workflow('example', {});

  for await (const event of await hatchet.listener.stream(workflowRunId)) {
    console.log('event received', event);
  }
}

main();
