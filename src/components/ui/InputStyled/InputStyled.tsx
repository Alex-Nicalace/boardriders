import { ButtonHTMLAttributes } from 'react';
import InputText, {
  TInputTextProps,
} from '../../../component-library/InputText';
import './InputStyled.scss';

type TButtonProps = (
  | {
      varint?: 'main';
      adornmentContent?: never;
    }
  | {
      varint: 'second';
      adornmentContent: React.ReactNode;
    }
) &
  (
    | { buttonProps?: never; buttonContent?: never }
    | {
        buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
        buttonContent: React.ReactNode;
      }
  );
type TInputStyledProps = TInputTextProps & TButtonProps;
function InputStyled({
  varint = 'main',
  buttonProps,
  buttonContent,
  adornmentContent,
  ...props
}: TInputStyledProps): JSX.Element {
  return (
    <InputText
      bemBlockName={`input-${varint}`}
      startAdornment={adornmentContent}
      endAdornment={
        Boolean(buttonContent) && (
          <button className={`input-${varint}__button`} {...buttonProps}>
            {buttonContent}
          </button>
        )
      }
      {...props}
    />
  );
}

export default InputStyled;
