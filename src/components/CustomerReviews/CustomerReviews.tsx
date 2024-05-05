import './CustomerReviews.scss';
import Rating from '../../component-library/Rating';
import RatingCounts from '../../component-library/RatingCounts';
import InputReview from '../InputReview';
import Review from '../Review';
import { StarIcon } from '../ui/Icons';
import Pagination from '../ui/Pagination';
import Title from '../ui/Title';
import { useScreenWidth } from '../../Context/useScreenWidthContext';

const DATA_RAITING = [
  {
    rating: 4,
    count: 8,
  },
  {
    rating: 5,
    count: 8,
  },
  {
    rating: 1,
    count: 1,
  },
  {
    rating: 2,
    count: 4,
  },
  {
    rating: 3,
    count: 2,
  },
];

const DATA_REVIEW = [
  {
    id: 1,
    name: 'Alexey K.',
    rating: 4,
    date: '2020-01-29',
    message: 'Кататься можно, если осторожно!',
  },
  {
    id: 2,
    name: 'Paren iz cluba',
    rating: 1,
    date: '2019-01-29',
    message:
      'Очень плохой скейт, прям много раз это готов повторить! Очень плохой скейт ! Очень плохой скейт! Очень плохой скейт! Очень плохой скейт! А вот сноуборд хороший',
  },
  {
    id: 3,
    name: 'Boris K.',
    rating: 5,
    date: '2020-05-29',
    message:
      'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Ipsum не строчка подпоясал последний, языкового власти, возвращайся составитель деревни грамматики, города пор пояс они имени свое свой грустный коварных.',
  },
  {
    id: 4,
    name: 'Alexey K.',
    rating: 4,
    date: '2020-01-29',
    message: 'Кататься можно, если осторожно!',
  },
  {
    id: 5,
    name: 'Paren iz cluba',
    rating: 1,
    date: '2019-01-29',
    message:
      'Очень плохой скейт, прям много раз это готов повторить! Очень плохой скейт ! Очень плохой скейт! Очень плохой скейт! Очень плохой скейт! А вот сноуборд хороший',
  },
  {
    id: 6,
    name: 'Boris K.',
    rating: 5,
    date: '2020-05-29',
    message:
      'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Ipsum не строчка подпоясал последний, языкового власти, возвращайся составитель деревни грамматики, города пор пояс они имени свое свой грустный коварных.',
  },
  {
    id: 7,
    name: 'Alexey K.',
    rating: 4,
    date: '2020-01-29',
    message: 'Кататься можно, если осторожно!',
  },
];

type TCustomerReviewsProps = {
  className?: string;
};
function CustomerReviews({
  className = '',
}: TCustomerReviewsProps): JSX.Element {
  const { isLessTablet, isLessMobile, isLessMobileSmall } = useScreenWidth();
  const { totalRating, countVotes } = DATA_RAITING.reduce(
    (acc, { rating, count }) => ({
      totalRating: acc.totalRating + rating * count,
      countVotes: acc.countVotes + count,
    }),
    { totalRating: 0, countVotes: 0 }
  );
  const averageRating = parseFloat((totalRating / countVotes).toFixed(1));

  return (
    <section className={`customer-reviews ${className}`}>
      <div className="customer-reviews__container">
        <Title
          className="customer-reviews__title"
          as="h2"
          supNode="24"
          kind="subtitle-1-21-medium"
        >
          Отзывы клиентов
        </Title>
        <div className="customer-reviews__review">
          <InputReview
            className="customer-reviews__input"
            type={isLessTablet ? 'column' : 'row'}
          />
          <ul className="customer-reviews__list">
            {DATA_REVIEW.map((review) => (
              <li className="customer-reviews__item" key={review.id}>
                <Review
                  rating={review.rating}
                  name={review.name}
                  dateString={review.date}
                  message={review.message}
                />
              </li>
            ))}
          </ul>
          <div className="customer-reviews__pagination">
            <Pagination
              currentPage={1}
              totalPages={54}
              visiblePageNumbers={isLessMobileSmall ? 3 : 4}
              // isShowNavigationButtons={!isLessMobileSmall}
            />
          </div>
        </div>
        <div className="customer-reviews__rating">
          <RatingCounts
            className="customer-reviews__rating-counts"
            data={DATA_RAITING}
            starElement={
              <StarIcon
                fill="#EB5757"
                stroke="#EB5757"
                width={16}
                height={16}
              />
            }
            meter={{
              borderRadius: '0',
              colorBg: '#e0e0e0',
              color: '#EB5757',
              hight: '2px',
            }}
            rowGap="10px"
          />
          <div className="customer-reviews__average-rating average-rating">
            <div className="average-rating__title">Средняя оценка</div>
            <div className="average-rating__value">{averageRating}</div>
            <Rating
              className="average-rating__rating"
              rating={averageRating}
              iconActiveElement={<StarIcon fill="#EB5757" stroke="#EB5757" />}
              iconUnactiveElement={
                <StarIcon fill="transparent" stroke="#000" />
              }
              size={isLessMobile ? '16px' : '20px'}
              gap={isLessMobile ? '8px' : '10px'}
              isShowValue={false}
              disabled
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerReviews;
