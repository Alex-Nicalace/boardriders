import { ButtonHTMLAttributes } from 'react';
import InputText, {
  TInputTextProps,
} from '../../../component-library/InputText';
import './InputStyled.scss';
import { DiscountIcon, GiftIcon, QuestionInCircleIcon } from '../Icons';

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
        buttonProps?: ButtonHTMLAttributes<HTMLButtonElement> & {
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
function InputStyled({
  variant = 'main',
  buttonProps,
  buttonContent,
  adornmentContent,
  isGrayLabel,
  className,
  placeBorder = 'input',
  ...props
}: TInputStyledProps): JSX.Element {
  const bemBlockName = `input-${variant}`;
  const { bgColor, color, ...propsButton } = buttonProps || {};

  return (
    <InputText
      bemBlockName={bemBlockName}
      className={[
        `${bemBlockName}_border_${placeBorder}`,
        isGrayLabel && `${bemBlockName}_label_gray`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      startAdornment={adornmentContent}
      endAdornment={
        Boolean(buttonContent) && (
          <button
            className={[
              `${bemBlockName}__button`,
              bgColor && `${bemBlockName}__button_bgColor_${bgColor}`,
              color && `${bemBlockName}__button_color_${color}`,
            ]
              .filter(Boolean)
              .join(' ')}
            type="button"
            {...propsButton}
          >
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
