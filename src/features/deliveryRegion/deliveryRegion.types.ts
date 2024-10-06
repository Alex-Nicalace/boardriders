import { useDeliveryRegionList } from './useDeliveryRegionList';

type TDeliveryRegionList = Exclude<
  ReturnType<typeof useDeliveryRegionList>['deliveryRegionList'],
  undefined
>;
export type TDeliveryRegionListProviderProps = {
  render: (deliveryRegionList: TDeliveryRegionList) => JSX.Element;
  renderLoading?: () => JSX.Element;
  renderError?: (error: Error) => JSX.Element;
};
