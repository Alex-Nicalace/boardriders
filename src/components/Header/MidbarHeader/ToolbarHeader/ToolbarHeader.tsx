import Popup from '../../../../component-library/Popup';
import ButtonToWishListPage from '../../../../features/wishList/ButtonToWishListPage';
import BurgerButton from '../../../ui/BurgerButton';
import IconButton from '../../../ui/IconButton';
import { AvatarIcon, CartIcon } from '../../../ui/Icons';
import Search from '../../Search';
import './ToolbarHeader.scss';

type TNameBtn = 'burger' | 'search' | 'login' | 'favorites' | 'cart';
type TToolbarBtns = {
  name: TNameBtn;
  content: JSX.Element;
}[];

const TOOLBAR_BTNS_DATA: TToolbarBtns = [
  { name: 'burger', content: <BurgerButton /> },
  { name: 'search', content: <Search /> },
  {
    name: 'login',
    content: (
      <Popup.Open
        windowName="login"
        render={({ open }) => (
          <IconButton onClick={open} IconComponent={AvatarIcon}>
            Войти
          </IconButton>
        )}
      />
    ),
  },
  {
    name: 'favorites',
    content: <ButtonToWishListPage className="midbar-header__link" />,
  },
  {
    name: 'cart',
    content: (
      <IconButton
        className="midbar-header__link"
        IconComponent={CartIcon}
        to="/"
      >
        Корзина
      </IconButton>
    ),
  },
];

type TToolbarHeaderProps = {
  className?: string;
  buttons: TNameBtn[];
};
function ToolbarHeader({
  className,
  buttons,
}: TToolbarHeaderProps): JSX.Element {
  const toolbarBtnsData = buttons.map(
    (name) => TOOLBAR_BTNS_DATA.find((btn) => btn.name === name)!
  );

  return (
    <ul className={['toolbar-header', className].filter(Boolean).join(' ')}>
      {toolbarBtnsData.map(({ content, name }) => (
        <li className="toolbar-header__item" key={name}>
          {content}
        </li>
      ))}
    </ul>
  );
}

export default ToolbarHeader;
