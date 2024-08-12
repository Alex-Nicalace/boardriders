import { ReactElement } from 'react';

export interface ICustomCSSProperties extends React.CSSProperties {
  '--select-transition-duration'?: string;
}

export type TSingleSelectProps = {
  isMulti?: false;
  initValue?: never;
  value: string;
  onChange: (value: string) => void;
  iconItemRemove?: never;
  isCloseDropdownWhenClicked?: never;
};
export type TSingleSelectUncontrolledProps = {
  isMulti?: false;
  initValue?: string;
  value?: never;
  onChange?: (value: string) => void;
  iconItemRemove?: never;
  isCloseDropdownWhenClicked?: never;
};

export type TMultiSelectProps = {
  isMulti: true;
  initValue?: never;
  value: string[];
  onChange: (value: string[]) => void;
  iconItemRemove?: React.ReactNode;
  isCloseDropdownWhenClicked?: boolean;
};
export type TMultiSelectUncontrolledProps = {
  isMulti: true;
  initValue?: string[];
  value?: never;
  onChange?: (value: string[]) => void;
  iconItemRemove?: React.ReactNode;
  isCloseDropdownWhenClicked?: boolean;
};

export type TCommonSelectProps = {
  children: ReactElement<OptionProps>[] | ReactElement<OptionProps>;
  name?: string;
  id?: string;
  className?: string;
  listOptions?: {
    className?: string;
  };
  iconSelect?: React.ReactNode;
  isLockScroll?: boolean;
  placreholder?: React.ReactNode;
  isSearchable?: boolean;
  tabIndex?: number;
  animationOptions?: {
    duration?: number;
  };
  fullWidth?: boolean;
};

export type TSelectProps = (
  | TSingleSelectProps
  | TMultiSelectProps
  | TSingleSelectUncontrolledProps
  | TMultiSelectUncontrolledProps
) &
  TCommonSelectProps;

export type OptionProps = {
  children: React.ReactNode;
  value: string;
  className?: string;
};
