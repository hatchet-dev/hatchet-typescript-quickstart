import Hatchet from "@hatchet-dev/typescript-sdk";
import { StepRunEvent } from "@hatchet-dev/typescript-sdk/clients/listener/listener-client";

const hatchet = Hatchet.init();

async function main() {
  const workflowRunId = await hatchet.admin.run_workflow("example", {});

  hatchet.listener.on(workflowRunId, async (event: StepRunEvent) => {
    console.log("Received event", event);
  });
}

main();
