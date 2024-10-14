import { Price, Hint, Title } from './RadioBox';

export type TRadioBoxProps = {
  name?: string;
  id?: string;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  view?: 'grid' | 'normal';
};

export interface IRadioBoxComponent
  extends React.ForwardRefExoticComponent<
    TRadioBoxProps & React.RefAttributes<HTMLInputElement>
  > {
  Title: typeof Title;
  Price: typeof Price;
  Hint: typeof Hint;
}
