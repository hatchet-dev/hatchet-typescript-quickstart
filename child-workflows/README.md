# Hatchet Child Workflows Examples

This is an example project demonstrating how to use Hatchet with Typescript using advanced Child Workflow Spawning. This example spawns multiple workflows for each document present in a specified directory.

## Prerequisites

Before running this project, make sure you have the following:

1. [Node V16 or higher](https://nodejs.org/en/download)

## Setup

1. Create a `.env` file in the `./child-workflows` directory and set the required environment variables. This requires the `HATCHET_CLIENT_TOKEN` variable created in the [Getting Started README](../README.md). If you would like to try the Generative AI examples in [./src/genai](./src/genai) You will also need, a `OPENAI_API_KEY` which can be created on the [OpenAI Website](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key).

```
HATCHET_CLIENT_TLS_STRATEGY=none
HATCHET_CLIENT_TOKEN="<token>"
OPENAI_API_KEY="<openai-key>" 
```

2. Open a terminal and navigate to the project root directory (`/child-workflows`):

   ```shell
   cd child-workflows
   ```

3. Run the following command to install the project dependencies:

   ```shell
   npm i
   ```

### Running an example

First, start a Hatchet worker by running the following command:

```shell
npm run worker:fanout
```

To send an example event, open the Hatchet dashboard, navigate to the `process-plan-work` and click `Trigger Event` with an empty json object.

You can also try a search by navigating to the `search-paragraphs` workflow and triggering the workflow with the following json:

```json copy
{
   "text": "<your search term>"
}
```