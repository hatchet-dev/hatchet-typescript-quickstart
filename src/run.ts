import { simple } from './tasks/first-task';

async function main() {
  const res = await simple.run({
    Message: 'hello',
  });

  // eslint-disable-next-line no-console
  console.log(res['to-lower'].TransformedMessage);
}

if (require.main === module) {
  main().catch(console.error).finally(() => process.exit(0));
}
