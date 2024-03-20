import Hatchet from "@hatchet-dev/typescript-sdk";
import { StepRunEvent } from "@hatchet-dev/typescript-sdk/clients/listener/listener-client";

const hatchet = Hatchet.init();

async function main() {
  const workflowRunId = await hatchet.admin.run_workflow("example", {});

  for await (const event of hatchet.listener.stream(workflowRunId)) {
    console.log("event received", event);
  }
}

main();
