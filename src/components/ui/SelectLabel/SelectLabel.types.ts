import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import {
  TSelectProps,
  TSingleSelectProps,
} from '../../../component-library/Select';

export type TSelectLabelProps = TSelectProps & {
  label?: React.ReactNode;
  isGrayLabel?: boolean;
  labelPosition?: 'top' | 'left';
  error?: string;
  isError?: boolean;
};

export type TSelectLabelControlProps<
  F extends FieldValues = FieldValues,
  N extends FieldPath<F> = FieldPath<F>
> = Omit<
  TSelectLabelProps,
  | 'onChange'
  | 'value'
  | 'onBlur'
  | 'error'
  | 'isError'
  | 'name'
  | keyof TSingleSelectProps
> &
  UseControllerProps<F, N> & {
    asNumber?: boolean;
    asDate?: boolean;
  };
