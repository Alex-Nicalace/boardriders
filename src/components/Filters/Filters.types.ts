export type TFiltersData = (
  | {
      items: {
        value: string;
        title?: React.ReactNode;
        count?: number;
        hint?: string;
      }[];
      type?: 'checkbox' | 'radio';
      isSearchable?: boolean;
      min?: never;
      max?: never;
    }
  | {
      items?: never;
      min: number;
      max: number;
      isSearchable?: never;
    }
) & {
  title: string;
  name: string;
  defaultOpen?: boolean;
};

export type TFiltersProps = {
  data: TFiltersData[];
  className?: string;
};

export type TFiltersMobileProps = {
  data: TFiltersData[];
  close?: () => void;
};
