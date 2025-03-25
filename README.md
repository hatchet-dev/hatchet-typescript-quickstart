# Hatchet Simple Examples

This is an example project demonstrating how to use Hatchet with Typescript.


## Prerequisites

Before running this project, make sure you have the following:

1. [Node V16 or higher](https://nodejs.org/en/download)

## Setup

1. Create a `.env` file in the root directory and set the required environment variables. This requires the `HATCHET_CLIENT_TOKEN` variable created in the [Getting Started README](https://docs.hatchet.run/quickstart).

```
HATCHET_CLIENT_TLS_STRATEGY=none
```

2. Open a terminal and navigate to the project root directory (`/simple-examples`):

   ```shell
   cd simple-examples
   ```

3. Run the following command to install the project dependencies:

   ```shell
   npm i
   ```

### Running an example

First, start a Hatchet worker by running the following command:

```shell
npm run worker:start
```

To send an example event, open a new terminal and run the following command:

```shell
npm run example:event
```

Check [all example workflows](#all-simple-workflows) below.

## Triggering a workflow

Follow the instructions in the root [project setup](../README.md) to launch the playground and start workflow runs.

## Project Overview

### Example Workflows

The project contains example workflows in the [`./src`](./src) directory. See `./package.json` for available scripts to run workers.

#### All Simple Workflows

The project includes a variety of basic workflows to demonstrate Hatchet's core capabilities, each showcasing different features:

1. **[Simple Workflow](src/simple-worker.ts)**: Demonstrates a straightforward process flow, showcasing the basics of setting up a workflow in Hatchet. `npm run worker:simple`
2. **[Concurrency Limit Workflow](./src/concurrency/concurrency-worker.ts)**: Shows how to manage concurrency limits within workflows to ensure that only a certain number of instances run simultaneously. `npm run worker:concurrency`
3. **[Directed Acyclic Graph (DAG) Workflow](src/dag-worker.ts)**: Illustrates setting up workflows with dependencies that form a Directed Acyclic Graph, demonstrating the advanced orchestration capabilities of Hatchet. `npm run worker:dag`
4. **[Manual Trigger Workflow](src/manual-trigger.ts)**: Explains how to initiate workflows manually, offering control over workflow execution triggers. `npm run worker:manual-trigger`
5. **[Retries Workflow](./src/retries-worker.ts)**: Demonstrates handling retries scenarios within workflows, ensuring that failed or stalled processes are appropriately managed. `npm run worker:retries`

To send an example event, open a new terminal and run the following command:

```shell
npm run example:event
```

#### Generative AI Workflows (Coming Soon)

For more complex use cases, the project includes examples that integrate with OpenAI's API for generative tasks:

1. **[Simple Response Generation]()**: A single-step workflow that makes a request to OpenAI, showcasing how to incorporate AI services into Hatchet workflows.
2. **[Basic Retrieval Augmented Generation (BasicRag)]()**: A multi-step workflow that involves loading website content, reasoning about the information, and generating a response with OpenAI, demonstrating the potential for complex, AI-driven processes.

<!-- ### Exposing the workflows via a RestAPI

For a more complete example of how you might use Hatchet as part of a deployed production service, check out the [FastAPI Example](../fast-api-react/README.md) -->
