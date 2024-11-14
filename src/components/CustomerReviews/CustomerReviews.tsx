import './CustomerReviews.scss';
import Rating from '../../component-library/Rating';
import RatingCounts from '../../component-library/RatingCounts';
import InputReview from '../InputReview';
import Review from '../Review';
import { StarIcon } from '../ui/Icons';
import Pagination from '../ui/Pagination';
import Title from '../ui/Title';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import Spinner from '../Spinner';
import { TCustomerReviewsProps } from './CustomerReviews.types';

function CustomerReviews({
  className,
  data,
  onPageChange,
  onSubmit,
}: TCustomerReviewsProps): JSX.Element {
  const { isLessTablet, isLessMobile, isLessMobileSmall } = useScreenWidth();
  const { reviews, reviewsStatistics } = data;
  const { totalRating, countVotes } = reviewsStatistics.list.reduce(
    (acc, { rating, count }) => ({
      totalRating: acc.totalRating + rating * count,
      countVotes: acc.countVotes + count,
    }),
    { totalRating: 0, countVotes: 0 }
  );
  const averageRating = countVotes
    ? parseFloat((totalRating / countVotes).toFixed(1))
    : 0;

  return (
    <section
      id="customer-reviews"
      className={['customer-reviews', className].filter(Boolean).join(' ')}
    >
      <div className="customer-reviews__container">
        <Title
          className="customer-reviews__title"
          as="h2"
          supNode={reviews.total}
          kind="subtitle-1-21-medium"
        >
          Отзывы клиентов
        </Title>
        <div className="customer-reviews__review">
          <InputReview
            className="customer-reviews__input"
            type={isLessTablet ? 'column' : 'row'}
            onSubmit={onSubmit}
          />
          {reviews.isLoading ? (
            <Spinner />
          ) : (
            <ul className="customer-reviews__list">
              {(reviews.list || []).map((review) => (
                <li className="customer-reviews__item" key={review.id}>
                  <Review
                    rating={review.rating}
                    name={review.users?.fullname || 'Аноним'}
                    dateString={review.insertedAt}
                    message={!!review.comment && review.comment}
                  />
                </li>
              ))}
            </ul>
          )}
          {(reviews.pages || 0) > 1 && (
            <div className="customer-reviews__pagination">
              <Pagination
                currentPage={reviews.page || 0}
                totalPages={reviews.pages || 0}
                visiblePageNumbers={isLessMobileSmall ? 3 : 4}
                onPageChange={onPageChange}
                // isShowNavigationButtons={!isLessMobileSmall}
              />
            </div>
          )}
        </div>
        {reviewsStatistics.isLoading ? (
          <Spinner />
        ) : (
          <div className="customer-reviews__rating">
            <RatingCounts
              className="customer-reviews__rating-counts"
              data={reviewsStatistics.list}
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
        )}
      </div>
    </section>
  );
}

export default CustomerReviews;
