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
  };

  onPageChange?: (page: number) => void;
};
