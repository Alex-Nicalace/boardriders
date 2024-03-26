import './ProductListFiltered.scss';
import Steps from '../ui/Steps';
import Title from '../ui/Title';
import ToggleButton from '../ToggleButton';
import randomString from '../../utils/randomString';
import Select from '../../component-library/Select';
import { SelectIcon } from '../ui/Icons';
import useMatchMedia from '../../hooks/useMatchMedia';

const ID = 'sort_' + randomString();

const SORTS = [
  {
    value: 'popular',
    text: 'Популярное',
  },
  {
    value: 'price-asc',
    text: 'По цене от меньшей к большей',
  },
  {
    value: 'price-desc',
    text: 'По цене от большей к меньшей',
  },
  {
    value: 'discount',
    text: 'По скидке',
  },
  {
    value: 'warm',
    text: 'Утеплению',
  },
];

const MEDIAQUERIES = ['( max-width: 991.98px )'];

type TProductListFilteredProps = { className?: string };
function ProductListFiltered({
  className = '',
}: TProductListFilteredProps): JSX.Element {
  const [isSmallerThanTablet] = useMatchMedia(MEDIAQUERIES);

  return (
    <section className={`product-list-filtered ${className}`}>
      <div className="product-list-filtered__container">
        <Title
          className="product-list-filtered__title"
          as="h2"
          kind="h1-32-h2-21"
          supNode="358"
        >
          Сноуборд
        </Title>
        <Steps className="product-list-filtered__steps" />
        <div className="product-list-filtered__toolbar">
          {!isSmallerThanTablet ? (
            <>
              <ToggleButton
                className="product-list-filtered__toolbar-toggle"
                labelActive="Скрыть фильтры"
                labelNotActive="Показать фильтры"
              />
              <label htmlFor={ID} className="product-list-filtered__sort-label">
                Сортировать по:
              </label>
              <Select
                className="product-list-filtered__sort-select"
                iconElement={<SelectIcon />}
                id={ID}
              >
                {SORTS.map((sort) => (
                  <Select.Option key={sort.value} value={sort.value}>
                    {sort.text}
                  </Select.Option>
                ))}
              </Select>
            </>
          ) : (
            <>
              <Select
                className="product-list-filtered__sort-select"
                iconElement={<SelectIcon />}
                id={ID}
                placreholder="Сортировать"
              >
                {SORTS.map((sort) => (
                  <Select.Option key={sort.value} value={sort.value}>
                    {sort.text}
                  </Select.Option>
                ))}
              </Select>
              <ToggleButton
                className="product-list-filtered__toolbar-toggle"
                isNotShowIcon
                labelActive="Фильтры"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductListFiltered;
