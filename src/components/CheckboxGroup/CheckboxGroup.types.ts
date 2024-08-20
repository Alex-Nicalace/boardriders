export type TCheckboxGroupProps = {
  name: string;
  isSearchable?: boolean;
  items: {
    value: string;
    title?: React.ReactNode;
    count?: number;
    hint?: React.ReactNode;
  }[];
  checkedValues?: string[];
  className?: string;
  type?: 'checkbox' | 'radio';

  onChange?: (value: string) => void;
};
