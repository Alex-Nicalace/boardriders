import { useBurgerContext } from '../Context/useBurgerContext';
import Popup from './Popup';
import BurgerMenu from './Header/BurgerMenu/BurgerMenu';

function BurgerMenuPopup(): JSX.Element {
  const { isOpen, setOpenMenu } = useBurgerContext();

  function handleClickOutside(e: MouseEvent) {
    const el = e.target;
    if (!(el instanceof HTMLElement)) return;
    if (el.closest('.burger') || el.closest('.options_opened')) return;
    setOpenMenu(false);
  }

  return (
    <Popup open={isOpen} onClickOutside={handleClickOutside}>
      <BurgerMenu />
    </Popup>
  );
}

export default BurgerMenuPopup;
