import './ShoppngList.scss';

type TDataItem = {
  name: string;
};

type TShoppngListProps<T> = {
  className?: string;
  data: T[];
  render?: (item: T) => React.ReactNode;
};

/**
 * * Сделал data массив объектов чтобы в будующем при необходимости добавлять новые данные, такие как ссылкка на
 * * страницу товара. В этом случае с помощью render можно передать функцию для отрисовки тега Link
 */
function ShoppngList<T extends TDataItem>({
  data,
  className,
  render = (item) => item.name,
}: TShoppngListProps<T>): JSX.Element {
  return (
    <ol className={['shoppng-list', className].filter(Boolean).join(' ')}>
      {data.map((item) => (
        <li className="shoppng-list__item" key={item.name}>
          {render(item)}
        </li>
      ))}
    </ol>
  );
}

export default ShoppngList;
