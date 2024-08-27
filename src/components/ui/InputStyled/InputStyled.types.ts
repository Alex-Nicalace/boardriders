import { TInputTextProps } from '../../../component-library/InputText';

type TInputStyledButtonProps = (
  | {
      variant?: 'main';
      adornmentContent?: never;
    }
  | {
      variant: 'second';
      adornmentContent: React.ReactNode;
    }
) &
  (
    | { buttonProps?: never; buttonContent?: never }
    | {
        buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & {
          bgColor?: 'black' | 'transparent';
          color?: 'white' | 'black' | 'dark-gray';
        };
        buttonContent: React.ReactNode;
      }
  );
export type TInputStyledcommonProps = {
  isGrayLabel?: boolean;
  placeBorder?: 'input' | 'wrap';
};

export type TInputStyledProps = TInputTextProps &
  TInputStyledButtonProps &
  TInputStyledcommonProps;
