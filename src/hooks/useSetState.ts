import { useState } from 'react';

export function useSetState<T extends object>(initState: T) {
  const [state, setState] = useState<T>(initState);

  const setMergeState = (
    value: Partial<T> | ((prevState: T) => Partial<T>)
  ) => {
    setState((prevValue) => {
      const newValue = typeof value === 'function' ? value(prevValue) : value;
      return { ...prevValue, ...newValue };
    });
  };

  return [state, setMergeState] as const;
}
