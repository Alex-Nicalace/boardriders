export type TFormAddressInputs = {
  country: string;
  region: string;
  city: string;
  street: string;
  index: string;
  house: string;
  apartment: string;
};

export type TFormAddressProps = {
  className?: string;
  addressToEdit?: TFormAddressInputs;
  onSubmit?: (data: TFormAddressInputs) => void;
};
