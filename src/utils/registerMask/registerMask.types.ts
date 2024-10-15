import { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';

type MaskHandlers = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus: (event: FocusEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};

type TRegisterMaskOptions = {
  isHideMask?: boolean;
  setValue?: (value: string) => void;
};

export type TRegisterMaskFn = (
  mask: string,
  options: TRegisterMaskOptions
) => MaskHandlers;

export type TApplyMaskFn = (
  event:
    | ChangeEvent<HTMLInputElement>
    | FocusEvent<HTMLInputElement, Element>
    | KeyboardEvent<HTMLInputElement>
) => void;
