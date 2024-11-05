import { ReactNode } from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { CustomError } from '../../../utils/CustomError';

export class InputDateError extends CustomError {}

export type TPartsDate = [string, string, string];

export type TInputDateProps = {
  className?: string;
  label?: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
  id?: string;
  name?: string;
  defaultValue?: Date | null;
  disabled?: boolean;

  onChange?: (value: Date | null) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement, Element>) => void;
};

export type TInputDateControlProps<
  F extends FieldValues = FieldValues,
  N extends FieldPath<F> = FieldPath<F>
> = Omit<
  TInputDateProps,
  'onChange' | 'onBlur' | 'defaultValue' | 'error' | 'name'
> &
  UseControllerProps<F, N>;
