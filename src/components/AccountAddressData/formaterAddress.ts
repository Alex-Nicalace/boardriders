import { TAddress, TKeysAddress } from './AccountAddressData.types';

export function formaterAddress(address: TAddress) {
  const addressKeys: TKeysAddress[] = [
    'country',
    'region',
    'index',
    'city',
    'street',
    'house',
    'apartment',
  ];
  return addressKeys
    .map((key) => address[key])
    .filter(Boolean)
    .join(', ');
}
