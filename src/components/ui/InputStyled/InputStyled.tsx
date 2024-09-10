import { forwardRef } from 'react';
import './InputStyled.scss';
import { TInputStyledProps } from './InputStyled.types';
import InputText from '../../../component-library/InputText';
import { DiscountIcon, GiftIcon, QuestionInCircleIcon } from '../Icons';

// Определяем интерфейс для дополнительных свойств
interface IInputStyledComponent
  extends React.ForwardRefExoticComponent<
    TInputStyledProps &
      React.RefAttributes<HTMLInputElement | HTMLTextAreaElement>
  > {
  LabelBonus: typeof LabelBonus;
  LabelDiscount: typeof LabelDiscount;
}

const InputStyled = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TInputStyledProps
>(
  (
    {
      variant = 'main',
      buttonProps,
      buttonContent,
      adornmentContent,
      isGrayLabel,
      className,
      placeBorder = 'input',
      ...props
    },
    ref
  ) => {
    const bemBlockName = `input-${variant}`;
    const { bgColor, color, ...propsButton } = buttonProps || {};

    return (
      <InputText
        ref={ref}
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
) as IInputStyledComponent;

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
