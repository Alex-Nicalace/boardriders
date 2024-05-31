import { InputHTMLAttributes, TextareaHTMLAttributes, useId } from 'react';
import './InputText.scss';
import { omit } from '../../utils/omit';

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

type TextAreaOnlyKeys = Exclude<
  keyof TextareaHTMLAttributes<HTMLTextAreaElement>,
  keyof InputHTMLAttributes<HTMLInputElement>
>;

type InputOnlyKeys = Exclude<
  keyof InputHTMLAttributes<HTMLInputElement>,
  keyof TextareaHTMLAttributes<HTMLTextAreaElement>
>;

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  isTextarea?: false;
} & { [k in TextAreaOnlyKeys]?: never };
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  isTextarea: true;
} & { [k in InputOnlyKeys]?: never };

export type TInputTextProps = ICustomProps & (InputProps | TextareaProps);

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
  ...props
}: TInputTextProps): JSX.Element {
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
        {!props.isTextarea && (
          <input
            className={`${bemBlockName}__input`}
            id={id}
            {...omit(props, 'isTextarea')}
            aria-invalid={hasError}
          />
        )}
        {props.isTextarea && (
          <textarea
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
      {hint && <p className={`${bemBlockName}__hint`}>{hint}</p>}
    </div>
  );
}

export default InputText;
