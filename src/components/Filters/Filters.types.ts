type TItem = {
  value: string;
  title?: string;
  count?: number;
  hint?: string;
};

type TData =
  | {
      items: TItem[];
      useCallbackData?: never;
    }
  | {
      items?: never;
      useCallbackData: () => {
        data: TItem[] | undefined;
        isLoading: boolean;
        error: Error | null;
      };
    };

export type TFiltersData = (
  | (TData & {
      type?: 'checkbox' | 'radio';
      isSearchable?: boolean;
      min?: never;
      max?: never;
    })
  | {
      items?: never;
      min: number;
      max: number;
      isSearchable?: never;
      useCallbackData?: never;
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
