import { ChangeEvent, useState } from 'react';

export const useChangeInput = (value: string) => {
  const [state, setState] = useState(value);

  const stateChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setState(e.currentTarget.value);
  };

  const resetState = () => {
    setState('');
  };

  return {
    state,
    stateChangeHandler,
    resetState,
  };
};
