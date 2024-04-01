import { useState } from 'react';
import './ProductListFiltered.scss';
import Steps from '../ui/Steps';
import Title from '../ui/Title';
import ToggleButton from '../ToggleButton';
import randomString from '../../utils/randomString';
import Select from '../../component-library/Select';
import { SelectIcon } from '../ui/Icons';
import useMatchMedia from '../../hooks/useMatchMedia';
import WareCard from '../ui/WareCard';
import Transition, { TTransition } from '../../component-library/Transition';

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

const PATH = '/src/assets/img/products-new/';

const PRODUCTS_DATA = [
  {
    wareId: '1',
    imgMain: PATH + '01.png',
    imgSecond: PATH + '01-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '2',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '3',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '4',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '5',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '6',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '7',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '8',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '9',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '10',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '11',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '12',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '13',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '14',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '15',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '16',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '17',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '18',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '19',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '20',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '21',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '22',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '23',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '24',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '25',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '26',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '27',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '28',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
];

const TRANSITION_STYLES: Record<TTransition, string> = {
  entering: '',
  entered: '',
  exiting: 'product-list-filtered_filters-hide',
  exited: 'product-list-filtered_filters-hide',
};

const MEDIAQUERIES = ['( max-width: 991.98px )'];

type TProductListFilteredProps = { className?: string };
function ProductListFiltered({
  className = '',
}: TProductListFilteredProps): JSX.Element {
  const [hideFilter, setHideFilter] = useState(false);
  const [isSmallerThanTablet] = useMatchMedia(MEDIAQUERIES);

  function toggleHideFilter() {
    setHideFilter((prev) => !prev);
  }

  return (
    <Transition unmountOnExit={false} enter={!hideFilter} timeout={300}>
      {(state) => (
        <section
          className={`product-list-filtered ${TRANSITION_STYLES[state]} ${className}`}
        >
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
                    isActive={!hideFilter}
                    onClick={toggleHideFilter}
                  />
                  <div className="product-list-filtered__sort">
                    <span className="product-list-filtered__sort-label">
                      <label htmlFor={ID}>Сортировать по:</label>
                    </span>
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
                  </div>
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
                    isActive={!hideFilter}
                    onClick={toggleHideFilter}
                  />
                </>
              )}
            </div>
            <div className="product-list-filtered__body">
              {(state !== 'exited' || !hideFilter) && (
                <div
                  className="product-list-filtered__filters"
                  style={{ border: '1px solid red' }}
                >
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Facilis quis, possimus rem hic, nam necessitatibus, magni fuga
                  velit minus aliquid eaque esse magnam voluptatibus libero
                  suscipit quia laboriosam! Sapiente, odit? Lorem ipsum, dolor
                  sit amet consectetur adipisicing elit. Perferendis quod itaque
                  voluptatum asperiores, ipsam quas ut voluptatem saepe aperiam
                  sequi porro modi quae debitis consectetur distinctio aut,
                  maxime excepturi, accusamus magnam fuga repellendus! Ipsam et
                  eius, aspernatur, blanditiis qui harum quasi nemo esse iusto
                  voluptatibus id ipsa at iure tempora dolorem, quidem sed.
                  Eligendi labore alias commodi, nam, atque ratione a aliquam
                  nesciunt fugiat debitis dignissimos molestiae, quidem aliquid?
                  Nesciunt repellat placeat laborum illo nulla corrupti ipsam,
                  asperiores ad ullam adipisci et odio autem fuga vitae!
                  Deleniti ab perferendis, consequatur aliquam id quidem eveniet
                  alias voluptates, laudantium quos facere adipisci suscipit
                  omnis, a aspernatur. Quaerat nam nemo magnam quam consequatur
                  numquam iusto, quidem nihil doloremque vero molestiae ad
                  veniam et ratione, ab eligendi aperiam repellat at repellendus
                  nisi neque in itaque? Dignissimos ipsam natus perferendis
                  asperiores! Eum dignissimos sit magnam architecto molestiae,
                  doloremque vero cupiditate perferendis omnis sed esse
                  deleniti. Quibusdam exercitationem a nobis esse inventore
                  velit nulla ipsam quasi quisquam, expedita explicabo ut
                  excepturi autem dolorum sit blanditiis. Quae voluptas dolores
                  consequuntur illum neque. Qui laudantium doloribus voluptatem
                  sed nam quam nisi? In at dicta veritatis, doloremque
                  voluptatibus cumque et nobis deserunt animi minima, nisi esse
                  qui autem maxime temporibus voluptatem perspiciatis pariatur
                  molestias eveniet ex blanditiis dolor ipsum! Assumenda tenetur
                  necessitatibus repellat mollitia soluta quos non odit.
                  Quibusdam iure accusamus, amet sed ratione veniam enim
                  laboriosam? Necessitatibus, consequuntur. Accusantium vitae
                  cum iusto alias eaque nobis. Quibusdam illo molestiae placeat
                  deleniti autem recusandae corporis et veritatis! Consequatur
                  iure tempora rem et repellendus odit praesentium commodi
                  nesciunt, neque magni, voluptates vel nemo voluptas! Similique
                  adipisci rem architecto odio incidunt nobis quae doloribus
                  numquam, quidem fuga saepe impedit doloremque autem fugit
                  ipsam facere eveniet perferendis veritatis, dolore vel aliquam
                  amet! Voluptates incidunt amet ad eum nemo sed, at accusantium
                  pariatur voluptas ratione maiores id blanditiis tempora
                  repellat ea hic consequatur adipisci quasi numquam. Corrupti,
                  necessitatibus ex. Facilis impedit eos sed, repellendus
                  corporis neque officia laboriosam, quibusdam excepturi
                  temporibus libero obcaecati. Tenetur sed velit cum voluptas
                  temporibus ab consequuntur incidunt, culpa nulla laborum
                  perspiciatis! Perferendis itaque natus non aperiam. Debitis,
                  eos sed. Cumque aliquid est commodi rerum repudiandae corrupti
                  eum saepe ex! Sit adipisci ducimus eius esse, velit fugit? Quo
                  iusto deleniti blanditiis neque, esse perspiciatis unde
                  doloribus eligendi fuga minima cum, officia dolores ipsa ad!
                  Quis est sint cumque sed laborum, exercitationem vel ipsam quo
                  quas blanditiis maiores adipisci enim at eius ab maxime quia
                  harum eveniet laudantium? Nesciunt officia aut expedita
                  repellendus hic facere eum est cupiditate, nihil animi rerum.
                  Quam, placeat veniam porro earum expedita illo. Earum
                  perferendis obcaecati eveniet molestias nisi sequi provident
                  nesciunt accusantium similique ullam animi eligendi atque,
                  alias rerum, unde quasi possimus, qui totam voluptatem hic
                  quod reprehenderit? Excepturi omnis, reiciendis quas quia
                  debitis reprehenderit magnam. Alias tempore corrupti,
                  voluptatum dolores perferendis voluptatibus cupiditate libero
                  magni maxime at modi, labore saepe molestiae optio voluptas.
                  Eaque officia doloribus cum non aliquid commodi eius facilis,
                  iure quod quae quisquam aliquam natus placeat ex eveniet qui
                  omnis aspernatur.
                </div>
              )}
              <div className="product-list-filtered__products">
                {PRODUCTS_DATA.map((product) => (
                  <WareCard
                    key={product.wareId}
                    className="product-list-filtered__product"
                    wareDate={product}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </Transition>
  );
}

export default ProductListFiltered;
