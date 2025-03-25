import { hatchet } from './hatchet-client';
import { simple } from './workflows/simple';

async function main() {
  const worker = await hatchet.worker('simple-worker', {
    workflows: [simple],
  });

  await worker.start();
}

if (require.main === module) {
  main();
}
