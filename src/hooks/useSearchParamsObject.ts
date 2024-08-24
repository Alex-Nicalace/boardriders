import { useSearchParams } from 'react-router-dom';
import { TFilterName } from '../components/Filters';

type TAddPrfix<T extends TFilterName> = T extends 'minPrice' | 'maxPrice'
  ? T
  : `${T}Ids`;

export function useSearchParamsObject<T extends TFilterName>(
  keys: T[]
): {
  [K in T as TAddPrfix<K>]: K extends 'minPrice' | 'maxPrice'
    ? number
    : number[];
} {
  const [searchParams] = useSearchParams();
  const result = {} as {
    [K in T as TAddPrfix<K>]: K extends 'minPrice' | 'maxPrice'
      ? number
      : number[];
  };

  keys.forEach((key) => {
    const paramValue = searchParams.get(key);
    if (key === 'minPrice' || key === 'maxPrice') {
      (result as any)[key] = Number(paramValue);
    } else {
      const paramArr = paramValue ? paramValue.split(',').map(Number) : [];
      (result as any)[`${key}Ids`] = paramArr;
    }
  });

  return result;
}
