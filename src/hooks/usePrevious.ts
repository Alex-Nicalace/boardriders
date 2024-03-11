import { useEffect, useRef } from 'react';

/**
 * Пользовательский React хук, который возвращает предыдущее значение входного параметра.
 *
 * @param {T} value - Текущее отслеживаемое значение
 * @return {T | undefined} Предыдущее значение
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
