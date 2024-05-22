import { ButtonHTMLAttributes } from 'react';
import InputText, {
  TInputTextProps,
} from '../../../component-library/InputText';
import './InputStyled.scss';
import { DiscountIcon, GiftIcon, QuestionInCircleIcon } from '../Icons';

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
  ) & {
    isGrayLabel?: boolean;
  };
export type TInputStyledProps = TInputTextProps & TButtonProps;
function InputStyled({
  varint = 'main',
  buttonProps,
  buttonContent,
  adornmentContent,
  isGrayLabel,
  className,
  ...props
}: TInputStyledProps): JSX.Element {
  return (
    <InputText
      bemBlockName={`input-${varint}`}
      className={[isGrayLabel && `input-${varint}_label_gray`, className]
        .filter(Boolean)
        .join(' ')}
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

type TIconLabelHintProps = {
  iconElement: JSX.Element;
  text: string;
};
function IconLabelHint({ iconElement, text }: TIconLabelHintProps) {
  return (
    <span className="icon-label-hint">
      <span className="icon-label-hint__icon">{iconElement}</span>
      <span className="icon-label-hint__text">{text}</span>
      <span className="icon-label-hint__icon-hint">
        <QuestionInCircleIcon />
      </span>
    </span>
  );
}

function LabelBonus() {
  return <IconLabelHint iconElement={<GiftIcon />} text="Бонусная карта" />;
}
function LabelDiscount() {
  return <IconLabelHint iconElement={<DiscountIcon />} text="Промо код" />;
}

InputStyled.LabelBonus = LabelBonus;
InputStyled.LabelDiscount = LabelDiscount;

export default InputStyled;
