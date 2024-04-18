import FiltersMobile from './FiltersMobile';
import Popup from './Popup';
import { TFiltersData } from './ProductListFiltered';

type FiltersMobilePopupProps = {
  isOpen: boolean;
  close?: () => void;
  data: TFiltersData[];
};
function FiltersMobilePopup({
  isOpen = false,
  close = () => {},
  data,
}: FiltersMobilePopupProps): JSX.Element {
  return (
    <Popup open={isOpen} close={close}>
      <FiltersMobile data={data} close={close} />
    </Popup>
  );
}

export default FiltersMobilePopup;
