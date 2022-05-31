import { useState, useEffect } from 'react';

const useDebounce = (value: string, delay: number = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
