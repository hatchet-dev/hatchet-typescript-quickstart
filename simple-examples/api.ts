import Hatchet, { AdminClient, Context } from "@hatchet-dev/typescript-sdk";
import { CreateWorkflowVersionOpts } from "@hatchet-dev/typescript-sdk/protoc/workflows";
import https from "https";

const hatchet = Hatchet.init(
  {
    log_level: "OFF",
  },
  {},
  {
    // This is needed for the local certificate in the example, but should not be used in production
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  }
);

const admin = hatchet.admin as AdminClient;

type CustomUserData = {
  example: string;
};

const opts: CreateWorkflowVersionOpts = {
  name: "api-workflow",
  description: "My workflow",
  version: "",
  eventTriggers: [],
  cronTriggers: [],
  scheduledTriggers: [],
  concurrency: undefined,
  jobs: [
    {
      name: "my-job",
      timeout: "60s",
      description: "Job description",
      steps: [
        {
          readableId: "custom-step",
          action: `default:step-one`,
          timeout: "60s",
          inputs: "{}",
          parents: [],
          userData: `{
            "example": "value"
          }`,
        },
      ],
    },
  ],
};

admin.put_workflow(opts);

admin.list_workflows().then((res) => {
  res.rows?.forEach((row) => {
    console.log(row);
  });
});

type StepOneInput = {
  key: string;
};

async function main() {
  const worker = await hatchet.worker("example-worker");

  worker.registerAction(
    "default:step-one",
    async (ctx: Context<StepOneInput, CustomUserData>) => {
      const setData = ctx.userData();
      console.log("executed step1!", setData);
      return { step1: "step1" };
    }
  );

  hatchet.admin.run_workflow("api-workflow", {});

  worker.start();
}

main();
