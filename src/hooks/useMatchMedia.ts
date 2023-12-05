import { useCallback, useLayoutEffect, useState } from 'react';

export type IMediaQuery = string[];

export type IMatchedMedia = boolean[];

/**
 *
 * @param queries масив с медиа запросами
 * @returns масив логических значений
 */
export default function useMatchMedia(queries: IMediaQuery): IMatchedMedia {
  const mediaQueryLists = queries.map((q) => window.matchMedia(q));

  /**
   * Получает текущее состояние медиа запросов
   */
  const getValue = useCallback(
    function getValue(): IMatchedMedia {
      return mediaQueryLists.map((mql) => mql.matches);
    },
    [mediaQueryLists]
  );

  const [value, setValue] = useState(getValue);

  useLayoutEffect(() => {
    function handleOnChange(): void {
      setValue(getValue);
    }
    mediaQueryLists.forEach((mql) =>
      mql.addEventListener('change', handleOnChange)
    );

    return function (): void {
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener('change', handleOnChange)
      );
    };
  }, [getValue, mediaQueryLists]);

  return value;
}
