import { TextareaHTMLAttributes, InputHTMLAttributes } from 'react';

export type TInputTextCommonProps = {
  label?: React.ReactNode;
  error?: React.ReactNode;
  isError?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  hint?: React.ReactNode;
  bemBlockName?: string;
  fullWidth?: boolean;
};

type TInputProps = React.DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type TTextareaProps = React.DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export type TInputTextProps = TInputTextCommonProps &
  (
    | (TInputProps & { isTextarea?: false })
    | (TTextareaProps & { isTextarea: true })
  );
