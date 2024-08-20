export type TFilterItem = {
  value: string;
  title?: string;
  count?: number;
  hint?: string;
};

export type TFiltersData = (
  | ((
      | {
          items: TFilterItem[];
          useCallbackData?: never;
        }
      | {
          items?: never;
          useCallbackData: () => {
            data: TFilterItem[] | undefined;
            isLoading: boolean;
            error: Error | null;
          };
        }
    ) & {
      type?: 'checkbox' | 'radio';
      isSearchable?: boolean;
      min?: never;
      max?: never;
      useGetData?: never;
    })
  | ({
      items?: never;
      type?: never;
      isSearchable?: never;
      useCallbackData?: never;
    } & (
      | { min: number; max: number; useGetData?: never }
      | {
          min?: never;
          max?: never;
          useGetData: () => {
            data:
              | {
                  min: number;
                  max: number;
                }
              | undefined
              | null;
            isLoading: boolean;
            error: Error | null;
          };
        }
    ))
) & {
  title: string;
  name: string;
  defaultOpen?: boolean;
};

export type TFiltersProps = {
  data: TFiltersData[];
  className?: string;
  isUseOnlyRemoteData?: boolean;
};

export type TFiltersMobileProps = {
  data: TFiltersData[];
  close?: () => void;
  isUseOnlyRemoteData?: boolean;
};
