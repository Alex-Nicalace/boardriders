import { TextareaHTMLAttributes, InputHTMLAttributes } from 'react';

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
} & {
  [k in TextAreaOnlyKeys]?: never;
};
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  isTextarea: true;
} & {
  [k in InputOnlyKeys]?: never;
};

export type TInputTextProps = ICustomProps & (InputProps | TextareaProps);
