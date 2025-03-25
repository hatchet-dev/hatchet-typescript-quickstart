import { hatchet } from '../hatchet-client';

// Input and output types are Optional 
// but helpful if shared between services
type SimpleInput = {
  Message: string;
};

type SimpleOutput = {
    TransformedMessage: string;
}; 

export const simple = hatchet.task<SimpleInput, SimpleOutput>({
  name: 'first-workflow',
  fn: (input) => {
    return {
      TransformedMessage: input.Message.toLowerCase(),
    };
  },
});
