import { InputHTMLAttributes } from 'react';
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
  const hasError = isError || Boolean(error);

  return (
    <div
      className={`${className} ${bemBlockName} ${
        hasError ? `${bemBlockName}_error` : ''
      } ${fullWidth ? `${bemBlockName}_full-width` : ''}`}
    >
      {(label || error) && (
        <div className={`${bemBlockName}__wrap-label`}>
          {label && (
            <label htmlFor={inputProps.id} className={`${bemBlockName}__label`}>
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
