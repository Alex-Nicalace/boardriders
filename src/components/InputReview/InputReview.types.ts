export type TInputReviewProps = {
  className?: string;
  type?: 'row' | 'column';
  onSubmit?: (data: TInputReviewForm) => void;
};

export type TInputReviewForm = {
  review: string;
  rating: number;
};
