export type TOrderStatusData = {
  id: number;
  status: string;
  totalPrice: number;
  payMethod: string;
};

export type TOrderStatusProps = {
  className?: string;
  mode?: 'compact' | 'large' | 'normal';
  data: TOrderStatusData;
};
