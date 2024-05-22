import { InputHTMLAttributes, useId } from 'react';
import './InputText.scss';

interface ICustomProps {
  label?: React.ReactNode;
  error?: React.ReactNode;
  isError?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  hint?: React.ReactNode;
  bemBlockName?: string;
  fullWidth?: boolean;
}
export type TInputTextProps = ICustomProps &
  InputHTMLAttributes<HTMLInputElement>;
function InputText({
  label,
  error,
  isError,
  startAdornment,
  endAdornment,
  hint,
  className = '',
  bemBlockName = 'input-text',
  fullWidth = false,
  ...inputProps
}: TInputTextProps): JSX.Element {
  const initId = useId();
  const id = inputProps.id || initId;
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
          {error && <p className={`${bemBlockName}__error`}>{error}</p>}
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
        <input
          className={`${bemBlockName}__input`}
          id={id}
          {...inputProps}
          aria-invalid={hasError}
        />
        {endAdornment && (
          <div
            className={`${bemBlockName}__adornment ${bemBlockName}__adornment_end`}
          >
            {endAdornment}
          </div>
        )}
      </div>
      {hint && <p className={`${bemBlockName}__hint`}>{hint}</p>}
    </div>
  );
}

export default InputText;
