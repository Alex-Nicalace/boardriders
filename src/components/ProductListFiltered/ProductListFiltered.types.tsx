import { TWareData } from '../ui/WareCard';

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

export type TProductListFilteredProps = {
  className?: string;
  data: {
    products: {
      list: TWareData[] | undefined;
      isLoading: boolean;
      error: Error | null;
      currentPage: number;
      totalPages: number;
    };
  };

  onPageChange?: (page: number) => void;
};
