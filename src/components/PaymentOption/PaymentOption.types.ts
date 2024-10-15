import { TPaymentData } from '../../types';

export type TPaymentInput = TPaymentData & {};

export type TPaymentOptionProps = {
  className?: string;
  defaultValues?: TPaymentInput;
  onSubmit?: (data: TPaymentInput) => void;
};
