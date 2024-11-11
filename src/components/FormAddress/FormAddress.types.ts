export type TFormAddressInputs = {
  country: string;
  region: string | null;
  city: string;
  street: string;
  index: string;
  house: string;
  apartment: string | null;
};

export type TFormAddressProps = {
  className?: string;
  addressToEdit?: TFormAddressInputs;
  disabled?: boolean;
  onSubmit?: (data: TFormAddressInputs) => void;
};
