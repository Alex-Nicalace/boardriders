import HeaderCart from '../../components/HeaderCart';
import { useLogout } from './useLogout';
import { useUser } from './useUser';

// type THeaderCartContainerProps = { }
function HeaderCartContainer(/*{ }: THeaderCartContainerProps*/): JSX.Element {
  const { user } = useUser();
  const { fullName } = user?.user_metadata || {};
  const { logout } = useLogout();

  return <HeaderCart nameAuthUser={fullName} onLogout={logout} />;
}

export default HeaderCartContainer;
