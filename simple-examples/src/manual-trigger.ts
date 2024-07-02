import Hatchet from '@hatchet-dev/typescript-sdk';

const hatchet = Hatchet.init();

async function main() {
  const workflowRun = await hatchet.admin.run_workflow('example', {});

  const workflowRunId = await workflowRun.getWorkflowRunId();

  for await (const event of await hatchet.listener.stream(workflowRunId)) {
    console.log('event received', event);
  }
}

main();
