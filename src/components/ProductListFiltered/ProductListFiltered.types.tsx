import { TFiltersData } from '../Filters';
import { TWareData } from '../ui/WareCard';

export type TProductListFilteredProps = {
  className?: string;
  data: {
    products: {
      list: TWareData[] | undefined;
      isLoading: boolean;
      error: Error | null;
      currentPage: number;
      totalPages: number;
      count: number;
      title: string | undefined;
    };
    sortOptions: { value: string; text: string }[];
    filters: TFiltersData[];
  };

  onPageChange?: (page: number) => void;
};
