import { useBurgerContext } from '../../../hooks/useBurgerContext';
import './BurgerButton.scss';

function BurgerButton(): JSX.Element {
  const { isOpen, setOpenMenu } = useBurgerContext();
  const className = isOpen ? 'burger burger_open' : 'burger';

  function handleToggleOpen() {
    setOpenMenu();
  }

  return (
    <button className={className} onClick={handleToggleOpen}>
      <span></span>
    </button>
  );
}

export default BurgerButton;
