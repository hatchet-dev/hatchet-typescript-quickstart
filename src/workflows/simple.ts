import { hatchet } from '../hatchet-client';

type SimpleInput = {
  Message: string;
};

type SimpleOutput = {
  'to-lower': {
    TransformedMessage: string;
  };
}; 

export const simple = hatchet.workflow<SimpleInput, SimpleOutput>({
  name: 'simple',
});

simple.task({
  name: 'to-lower',
  fn: (input) => {
    return {
      TransformedMessage: input.Message.toLowerCase(),
    };
  },
});
