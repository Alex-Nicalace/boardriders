import { TInputReviewForm } from '../InputReview';

export type TCustomerReviewsProps = {
  className?: string;
  data: {
    reviews: {
      list?: {
        id: number;
        comment: string | null;
        insertedAt: string;
        rating: number;
        users: {
          fullname: string | null;
        } | null;
      }[];
      total?: number | null;
      pages?: number | null;
      page?: number | null;
      isLoading?: boolean;
    };
    reviewsStatistics: {
      list: {
        rating: number;
        count: number;
      }[];
      isLoading?: boolean;
    };
  };

  onPageChange?: (page: number) => void;
  onSubmit?: (data: TInputReviewForm) => void;
};
