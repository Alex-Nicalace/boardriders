import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TFilterName } from '../components/Filters';

export function useConsistencySearchParams({
  filterName,
  data: dataProp,
}: {
  filterName: TFilterName;
  data: { value: string }[] | undefined;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const data =
    filterName === 'color'
      ? dataProp?.map(({ value }) => value.split('|')[0])
      : dataProp?.map(({ value }) => value);

  useEffect(
    function updateSearchParams() {
      if (!data) return;

      const valueCurrentStr = searchParams.get(filterName);
      if (!valueCurrentStr) return;
      const valueCurrentArr = valueCurrentStr.split(',');

      const valueNewArr = valueCurrentArr.filter((item) =>
        data.some((value) => value === item)
      );

      const valueNewStr = valueNewArr.join(',');

      // Если значение не изменилось, то ничего не делаем
      if (valueNewStr === valueCurrentStr) return;

      // Если значение пустое, то удаляем параметр
      if (valueNewArr.length === 0) {
        searchParams.delete(filterName);
      } else {
        // Если значение не пустое, то добавляем параметр
        searchParams.set(filterName, valueNewStr);
      }

      setSearchParams(searchParams, { replace: true });
    },
    [data, filterName, searchParams, setSearchParams]
  );
}
