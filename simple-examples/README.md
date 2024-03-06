# Hatchet Simple Examples

This is an example project demonstrating how to use Hatchet with Python.

## Prerequisites

Before running this project, make sure you have the following:

1. [Node V16 or higher](https://nodejs.org/en/download)

## Setup

1. Create a `.env` file in the `./simple-examples` directory and set the required environment variables. This requires the `HATCHET_CLIENT_TOKEN` variable created in the [Getting Started README](../README.md). If you would like to try the Generative AI examples in [./src/genai](./src/genai) You will also need, a `OPENAI_API_KEY` which can be created on the [OpenAI Website](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key).

```
HATCHET_CLIENT_TLS_STRATEGY=none
HATCHET_CLIENT_TOKEN="<token>"
OPENAI_API_KEY="<openai-key>" # (OPTIONAL) only required to run examples in [./src/genai](./src/genai)
```

2. Open a terminal and navigate to the project root directory (`/simple-examples`).

3. Run the following command to install the project dependencies:

   ```shell
   poetry install
   ```

### Running the Hatchet Worker

In a separate terminal, start the the Hatchet worker by running the following command:

```shell
poetry run hatchet
```

## Triggering a workflow

Follow the instructions in the root [project setup](../README.md) to launch the playground and start workflow runs.

## Project Overview

### Example Workflows

The project contains example workflows in the [`./src`](./src) directory. See `./package-json` for available scripts to run workers.

#### Super Simple Workflows

The project includes a variety of basic workflows to demonstrate Hatchet's core capabilities, each showcasing different features:

1. **[Simple Workflow](./simple-worker.ts)**: Demonstrates a straightforward process flow, showcasing the basics of setting up a workflow in Hatchet.
2. **[Concurrency Limit Workflow](./concurrency/concurrency-worker.ts)**: Shows how to manage concurrency limits within workflows to ensure that only a certain number of instances run simultaneously.
3. **[Directed Acyclic Graph (DAG) Workflow](./dag-worker.ts)**: Illustrates setting up workflows with dependencies that form a Directed Acyclic Graph, demonstrating the advanced orchestration capabilities of Hatchet.
4. **[Manual Trigger Workflow](./manual-trigger.ts)**: Explains how to initiate workflows manually, offering control over workflow execution triggers.
5. **[Retries Workflow](./retries-worker.py)**: Demonstrates handling retries scenarios within workflows, ensuring that failed or stalled processes are appropriately managed.

#### Generative AI Workflows (Coming Soon)

For more complex use cases, the project includes examples that integrate with OpenAI's API for generative tasks:

1. **[Simple Response Generation]()**: A single-step workflow that makes a request to OpenAI, showcasing how to incorporate AI services into Hatchet workflows.
2. **[Basic Retrieval Augmented Generation (BasicRag)]()**: A multi-step workflow that involves loading website content, reasoning about the information, and generating a response with OpenAI, demonstrating the potential for complex, AI-driven processes.

<!-- ### Exposing the workflows via a RestAPI

For a more complete example of how you might use Hatchet as part of a deployed production service, check out the [FastAPI Example](../fast-api-react/README.md) -->
