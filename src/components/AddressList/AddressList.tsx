import './AddressList.scss';

type TAddressListProps = {
  className?: string;
  data?: string[];
};
function AddressList({ className, data }: TAddressListProps): JSX.Element {
  return (
    <ul className={['address-list', className].filter(Boolean).join(' ')}>
      {data?.map((address) => (
        <li className="address-list__item" key={address}>
          {address}
        </li>
      ))}
    </ul>
  );
}

export default AddressList;
