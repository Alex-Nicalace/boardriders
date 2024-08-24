import { useSearchParams } from 'react-router-dom';
import { TFilterName } from '../components/Filters';

type TAddPrfix<T extends TFilterName> = T extends 'minPrice' | 'maxPrice'
  ? T
  : T extends 'category'
  ? 'categories'
  : `${T}Ids`;

export function useSearchParamsObject<T extends TFilterName>(
  keys: T[]
): {
  [K in T as TAddPrfix<K>]: K extends 'minPrice' | 'maxPrice'
    ? number
    : K extends 'category'
    ? string[]
    : number[];
} {
  const [searchParams] = useSearchParams();
  const result = {} as {
    [K in T as TAddPrfix<K>]: K extends 'minPrice' | 'maxPrice'
      ? number
      : K extends 'category'
      ? string[]
      : number[];
  };

  keys.forEach((key) => {
    const paramValue = searchParams.get(key);

    switch (key) {
      case 'minPrice':
      case 'maxPrice':
        (result as any)[key] = Number(paramValue);
        break;
      case 'category':
        (result as any)['categories'] = paramValue ? paramValue.split(',') : [];
        break;
      default: {
        const paramArr = paramValue ? paramValue.split(',').map(Number) : [];
        (result as any)[`${key}Ids`] = paramArr;
      }
    }
  });

  return result;
}
