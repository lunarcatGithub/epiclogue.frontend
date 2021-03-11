import { useEffect, useState } from 'react';

export default function useDebounce(value, delay = 2000) {
  const [debouncedValue, setDebouncedValue] = useState(null);

  useEffect(() => {
    if (value === undefined) return;
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedValue;
}
