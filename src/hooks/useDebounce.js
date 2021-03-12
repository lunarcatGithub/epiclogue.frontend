import { useEffect, useState } from 'react';

export default function useDebounce() {
  const [debouncedValue, setDebouncedValue] = useState();
  const [value, getValue] = useState();
  console.log(value)
  useEffect(() => {
    if (value === undefined) return;
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return [debouncedValue, getValue];
}
