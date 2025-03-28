# Hatchet First Workflow Example

This is an example project demonstrating how to use Hatchet with Typescript.


## Prerequisites

Before running this project, make sure you have the following:

1. [Node V16 or higher](https://nodejs.org/en/download)

## Setup

1. Set the required environment variable `HATCHET_CLIENT_TOKEN` created in the [Getting Started Guide](https://docs.hatchet.run/home/hatchet-cloud-quickstart).

```
export HATCHET_CLIENT_TOKEN=<token>
```

2. Run the following command to install the project dependencies:

   ```shell
   npm install
   ```

### Running an example

1. Start a Hatchet worker by running the following command:

```shell
npm run start
```

2. To run the example workflow, open a new terminal and run the following command:

```shell
npm run run:simple
```

This will trigger the workflow on the worker running in the first terminal and print the output to the the second terminal.