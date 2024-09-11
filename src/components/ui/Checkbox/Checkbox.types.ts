import { LabelAmount } from './Checkbox';

export type TColor =
  | {
      color: string;
      pathImg?: undefined;
    }
  | {
      color?: undefined;
      pathImg: string;
    };

export type TCheckboxProps = (
  | {
      variant?: 'checkbox';
      label?: React.ReactNode;
      hint?: React.ReactNode;
      variantIcon?: 'circle' | 'square';
    }
  | ({
      variant: 'btn-color';
      label?: never;
      hint?: never;
      variantIcon?: never;
    } & TColor)
  | {
      variant: 'btn-toggle';
      label?: string;
      hint?: never;
      variantIcon?: never;
    }
) & {
  name?: string;
  id?: string;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: 'checkbox' | 'radio';
  disabled?: boolean;
  styleDisabled?: boolean;
  title?: string;
  isError?: boolean;
};
export interface ICheckboxComponent
  extends React.ForwardRefExoticComponent<
    TCheckboxProps & React.RefAttributes<HTMLInputElement>
  > {
  LabelAmount: typeof LabelAmount;
}

export type TLabelProps = {
  label: React.ReactNode;
  count: number;
};
