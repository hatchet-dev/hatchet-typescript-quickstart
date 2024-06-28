import Hatchet from '@hatchet-dev/typescript-sdk';

async function main() {
  const hatchet = Hatchet.init();

  const workflowRun = await hatchet.admin.runWorkflow('simple-workflow', {
    test: 'test',
  });

  const workflowRunId = await workflowRun.getWorkflowRunId();

  console.log('listening for events');
  for await (const event of await hatchet.listener.stream(workflowRunId)) {
    console.log('event received', event);
  }
  console.log('done listening for events');
}

main();
