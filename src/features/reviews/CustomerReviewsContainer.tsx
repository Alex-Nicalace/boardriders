import { useSearchParams } from 'react-router-dom';
import CustomerReviews from '../../components/CustomerReviews';
import { useReviews } from './useReviews';
import { useReviewsStatistics } from './useReviewsStatistics';
import { TInputReviewForm } from '../../components/InputReview';

type TCustomerReviewsContainerProps = {
  className?: string;
};
function CustomerReviewsContainer({
  className,
}: TCustomerReviewsContainerProps): JSX.Element {
  const {
    reviews,
    count,
    isLoading: isLoadingReviews,
    totalPage,
    pageNum,
  } = useReviews();
  const { reviewsStatistics, isLoading: isLoadingStatistics } =
    useReviewsStatistics();
  const [searchParams, setSearchParams] = useSearchParams();

  const data = {
    reviews: {
      list: reviews,
      total: count,
      pages: totalPage,
      page: pageNum,
      isLoading: isLoadingReviews,
    },
    // если кокой-то оцеки нет, то оценка будет 0
    reviewsStatistics: {
      list: Array.from({ length: 5 }).map((_, index) => ({
        rating: index + 1,
        count:
          (reviewsStatistics || []).find(({ rating }) => rating === index + 1)
            ?.count || 0,
      })),
      isLoading: isLoadingStatistics,
    },
  };

  function handlePageChange(page: number) {
    searchParams.set('pageReviews', String(page));
    setSearchParams(searchParams, { preventScrollReset: true });
  }

  function handleSubmit(data: TInputReviewForm) {
    console.log(data);
  }

  return (
    <CustomerReviews
      className={className}
      data={data}
      onPageChange={handlePageChange}
      onSubmit={handleSubmit}
    />
  );
}

export default CustomerReviewsContainer;
