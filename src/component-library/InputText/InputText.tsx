import { forwardRef, useId } from 'react';
import './InputText.scss';
import { omit } from '../../utils/omit';
import { TInputTextProps } from './InputText.types';

const InputText = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TInputTextProps
>(
  (
    {
      label,
      error,
      isError,
      startAdornment,
      endAdornment,
      hint,
      className,
      bemBlockName = 'input-text',
      fullWidth = false,
      positionError = 'top-right',
      ...props
    },
    ref
  ) => {
    const initId = useId();
    const id = props.id || initId;
    const hasError = isError || Boolean(error);
    const classes = [
      bemBlockName,
      hasError && `${bemBlockName}_error`,
      fullWidth && `${bemBlockName}_full-width`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={classes}>
        {(label || error) && (
          <div className={`${bemBlockName}__wrap-label`}>
            {label && (
              <label htmlFor={id} className={`${bemBlockName}__label`}>
                {label}
              </label>
            )}
            {error && positionError === 'top-right' && (
              <p className={`${bemBlockName}__error`}>{error}</p>
            )}
          </div>
        )}
        <div className={`${bemBlockName}__wrap`}>
          {startAdornment && (
            <div
              className={`${bemBlockName}__adornment ${bemBlockName}__adornment_start`}
            >
              {startAdornment}
            </div>
          )}
          {!props.isTextarea && (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              className={`${bemBlockName}__input`}
              id={id}
              {...omit(props, 'isTextarea')}
              aria-invalid={hasError}
            />
          )}
          {props.isTextarea && (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={`${bemBlockName}__input`}
              id={id}
              {...omit(props, 'isTextarea')}
              aria-invalid={hasError}
            ></textarea>
          )}
          {endAdornment && (
            <div
              className={`${bemBlockName}__adornment ${bemBlockName}__adornment_end`}
            >
              {endAdornment}
            </div>
          )}
        </div>
        {error && positionError === 'bottom' ? (
          <p className={`${bemBlockName}__error`}>{error}</p>
        ) : (
          hint && <p className={`${bemBlockName}__hint`}>{hint}</p>
        )}
      </div>
    );
  }
);

export default InputText;
