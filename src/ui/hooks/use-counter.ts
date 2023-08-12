import { Dispatch, SetStateAction, useState } from 'react';

interface ReturnType {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: (newValue?: number) => void;
  setCount: Dispatch<SetStateAction<number>>;
}

function useCounter(initialValue?: number): ReturnType {
  const [count, setCount] = useState(initialValue || 0);

  const increment = () => setCount((x) => x + 1);
  const decrement = () => setCount((x) => x - 1);
  const reset = (newValue?: number) => setCount(newValue || initialValue || 0);

  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
  };
}

export default useCounter;
