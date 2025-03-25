# Hatchet Simple Examples

This is an example project demonstrating how to use Hatchet with Typescript.


## Prerequisites

Before running this project, make sure you have the following:

1. [Node V16 or higher](https://nodejs.org/en/download)

## Setup

1. Create a `.env` file in the root directory and set the required environment variables. This requires the `HATCHET_CLIENT_TOKEN` variable created in the [Getting Started Guide](https://docs.hatchet.run/home/hatchet-cloud-quickstart).

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
npm run start
```

To send an example event, open a new terminal and run the following command:

```shell
npm run run:simple
```