export type TInputReviewProps = {
  className?: string;
  type?: 'row' | 'column';
  disabled?: boolean;
  onSubmit?: (data: TInputReviewForm, onSaccess?: () => void) => void;
};

export type TInputReviewForm = {
  comment: string;
  rating: number;
};
