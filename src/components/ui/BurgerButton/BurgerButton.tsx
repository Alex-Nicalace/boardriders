import Popup from '../../../component-library/Popup';
import './BurgerButton.scss';

function BurgerButton(): JSX.Element {
  return (
    <Popup.Open
      windowName="burger"
      render={({ toggle }) => (
        <button className="burger" onClick={toggle}>
          <span></span>
        </button>
      )}
    />
  );
}

export default BurgerButton;
