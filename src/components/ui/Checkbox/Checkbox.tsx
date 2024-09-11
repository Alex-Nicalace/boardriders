import React, { forwardRef } from 'react';
import './Checkbox.scss';
import { CheckIcon } from '../Icons';
import {
  ICheckboxComponent,
  TCheckboxProps,
  TLabelProps,
} from './Checkbox.types';

const Checkbox = forwardRef<HTMLInputElement, TCheckboxProps>(
  (
    {
      name,
      id,
      className = '',
      checked,
      defaultChecked,
      onChange,
      value,
      type = 'checkbox',
      disabled,
      styleDisabled = false,
      title,
      isError,
      ...props
    },
    ref
  ) => {
    let innerHtml: React.ReactNode;
    let classes = '';
    let nameBlock = 'checkbox';

    switch (props.variant) {
      case 'btn-color':
        {
          const { color, pathImg } = props;
          classes = 'checkbox-color';
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
          const { label, hint, variantIcon } = props;
          const isReactElement = typeof label === 'object';
          // classes = `checkbox ${type === 'radio' ? 'checkbox_radio' : ''}`;
          classes = [
            'checkbox',
            type === 'radio' && 'checkbox_radio',
            variantIcon === 'square' && 'checkbox_square',
          ]
            .filter(Boolean)
            .join(' ');

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
      <label
        className={[
          classes,
          className,
          styleDisabled && `${nameBlock}_disabled`,
          isError && `${nameBlock}_error`,
        ]
          .filter(Boolean)
          .join(' ')}
        title={title}
      >
        <input
          ref={ref}
          className={`${nameBlock}__input sr-only`}
          type={type}
          name={name}
          id={id}
          defaultChecked={defaultChecked}
          checked={checked}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />
        {innerHtml}
      </label>
    );
  }
) as ICheckboxComponent;

export function LabelAmount({ label, count }: TLabelProps): JSX.Element {
  return (
    <span className="checkbox__label checkbox__label_counter">
      <span className="checkbox__label-item">{label}</span>
      <span className="checkbox__label-count">{count}</span>
    </span>
  );
}

Checkbox.LabelAmount = LabelAmount;

export default Checkbox;
