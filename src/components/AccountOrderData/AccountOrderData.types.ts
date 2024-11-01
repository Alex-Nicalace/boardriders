import { TOrderStatusData } from '../OrderStatus';

export type TAccountOrderDataProps = {
  className?: string;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  data: TOrderStatusData[];

  onPerPageChange: (count: number) => void;
  onPageChange: (page: number) => void;
};
