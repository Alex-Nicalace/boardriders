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
    };
  };

  onPageChange?: (page: number) => void;
};
