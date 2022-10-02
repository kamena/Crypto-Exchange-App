import {useEffect, useState} from 'react';

function useDebounce<T>(value: T, timeout = 500): T {
  const [state, setState] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setState(value), timeout);
    return () => clearTimeout(handler);
  }, [value, timeout]);

  return state;
}

export default useDebounce;
