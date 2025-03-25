import { hatchet } from '../hatchet-client';


export const simple = hatchet.workflow({
  name: 'first-workflow',
});

const step1 = simple.task({
  name: 'first-task',
  fn: (input) => {
    return {
      "message": "Hello, world!"
    };
  },
});

const step2 = simple.task({
  name: 'second-task',
  parents: [step1],
  fn: (input) => {
    return {
      "message": "Hello, moon!"
    };
  },
});



