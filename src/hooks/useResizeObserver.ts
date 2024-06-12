import { useEffect, useState } from 'react';

type TSize =
  | {
      width: number;
      height: number;
      scrollWidth: number;
      scrollHeight: number;
    }
  | undefined;
/**
 * Хук React, возвращающий массив размеров для предоставленных React-объектов ref к элементам HTMLElement.
 * ! Для работы необходимо передать в качестве аргумента только меморизированный массив ref к элементам,
 * ! иначе будет зацикливание!
 * @param refs - Массив React-объектов ref к элементам HTMLElement.
 * @return Массив размеров для предоставленных ref. Если элемент не существует, возвращается undefined.
 */
export function useResizeObserver(
  refs: React.RefObject<HTMLElement>[]
): TSize[] | undefined[] {
  // Map для хранения размеров элементов. Ключом является ссылка на элемент, а значением - объект с шириной и высотой.
  const [sizes, setSizes] = useState<Map<Element, TSize>>(new Map());

  useEffect(() => {
    /**
     * Функция, которая будет срабатывать при изменении размеров элементов.
     * Обновляет состояние размеров на основе предоставленного массива ResizeObserverEntry.
     * @param entries - Массив записей ResizeObserverEntry, представляющих элементы, размеры которых изменились.
     */
    const handleResize = (entries: ResizeObserverEntry[]) => {
      setSizes((prevSizes) => {
        // Создаем копию предыдущего состояния, чтобы не потерять значения из предыдущих обновлений.
        const nextSizes = new Map(prevSizes);
        entries.forEach(({ contentRect: { width, height }, target }) => {
          const scrollHeight = target.scrollHeight;
          const scrollWidth = target.scrollWidth;
          nextSizes.set(target, { width, height, scrollHeight, scrollWidth });
        });
        return nextSizes;
      });
    };

    // Создаем наблюдателя на изменения размеров элементов
    const resizeObserver = new ResizeObserver(handleResize);

    // Настройка наблюдателя на основе предоставленных ссылок
    refs.forEach((ref) => {
      if (!ref.current) return;
      resizeObserver.observe(ref.current);
    });

    // Очистка наблюдателя при размонтировании или изменении refs
    return () => {
      refs.forEach((ref) => {
        if (!ref.current) return;
        resizeObserver.unobserve(ref.current);
      });
      resizeObserver.disconnect();
    };
  }, [refs]);

  // Возвращаем массив с размерами элементов. Если элемент не существует, то возвращаем undefined
  // это чтобы размер массива результатов соответствовал размеру массива аргументов
  const sizesArray = refs.map((ref) =>
    ref.current ? sizes.get(ref.current) : undefined
  );

  return sizesArray;
}
