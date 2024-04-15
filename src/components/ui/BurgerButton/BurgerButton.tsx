import { useBurgerContext } from '../../../Context/useBurgerContext';
import './BurgerButton.scss';

function BurgerButton(): JSX.Element {
  const { setOpenMenu } = useBurgerContext();

  function handleToggleOpen() {
    setOpenMenu();
  }

  return (
    <button className="burger" onClick={handleToggleOpen}>
      <span></span>
    </button>
  );
}

export default BurgerButton;
