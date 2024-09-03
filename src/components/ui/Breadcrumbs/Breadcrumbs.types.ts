interface TBreadcrumbsItemData {
  to?: string;
  title: string;
}
export type TBreadcrumbsData = [
  ...Required<TBreadcrumbsItemData>[],
  TBreadcrumbsItemData
];
export type TBreadcrumbsProps = {
  data: TBreadcrumbsData;
  color?: 'black' | 'white';
  className?: string;
  modificator?: 'independent';
};
