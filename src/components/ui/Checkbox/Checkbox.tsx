import './Checkbox.scss';
import { CheckIcon } from '../Icons';
import React from 'react';

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
    }
  | ({
      variant: 'btn-color';
      label?: never;
      hint?: never;
    } & TColor)
  | {
      variant: 'btn-toggle';
      label?: string;
      hint?: never;
    }
) & {
  name?: string;
  id?: string;
  className?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: 'checkbox' | 'radio';
  disabled?: boolean;
};
function Checkbox({
  name,
  id,
  className = '',
  checked,
  onChange,
  value,
  type = 'checkbox',
  disabled,
  ...props
}: TCheckboxProps): JSX.Element {
  let innerHtml: React.ReactNode;
  let classes = '';
  let nameBlock = 'checkbox';

  switch (props.variant) {
    case 'btn-color':
      {
        const { color, pathImg } = props;
        classes = `${className} checkbox-color`;
        nameBlock = 'checkbox-color';

        innerHtml = (
          <span className="checkbox-color__wrap">
            <span
              className="checkbox-color__color"
              style={{ background: color }}
            >
              {pathImg && <img src={pathImg} alt="цвет" loading="lazy" />}
            </span>
          </span>
        );
      }
      break;

    case 'btn-toggle':
      {
        const { label } = props;
        classes = 'btn-toggle';
        nameBlock = 'btn-toggle';

        innerHtml = (
          <>
            <span className="btn-toggle__inner">{label}</span>
          </>
        );
      }
      break;
    default:
      {
        const { label, hint } = props;
        const isReactElement = typeof label === 'object';
        classes = `checkbox ${type === 'radio' ? 'checkbox_radio' : ''}`;

        innerHtml = (
          <>
            <span className="checkbox__icon">
              {type === 'checkbox' && (
                <CheckIcon className="checkbox__icon-check" />
              )}
            </span>
            {!isReactElement && (
              <span className="checkbox__label">{label}</span>
            )}
            {isReactElement && label}
            {hint && <span className="checkbox__hint">{hint}</span>}
          </>
        );
      }
      break;
  }

  return (
    <label className={`${classes} ${className}`}>
      <input
        className={`${nameBlock}__input sr-only`}
        type={type}
        name={name}
        id={id}
        defaultChecked={checked}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
      {innerHtml}
    </label>
  );
}

type TLabelProps = {
  label: React.ReactNode;
  count: number;
};
function LabelAmount({ label, count }: TLabelProps): JSX.Element {
  return (
    <span className="checkbox__label checkbox__label_counter">
      <span className="checkbox__label-item">{label}</span>
      <span className="checkbox__label-count">{count}</span>
    </span>
  );
}

Checkbox.LabelAmount = LabelAmount;

export default Checkbox;
