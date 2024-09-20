import AccountEnter from '../../components/AccountEnter';
import { useLogout } from './useLogout';
import { useUser } from './useUser';

type TAccountEnterContainerProps = { className?: string };
function AccountEnterContainer({
  className,
}: TAccountEnterContainerProps): JSX.Element {
  const { logout } = useLogout();
  const { isAuthenticated, user } = useUser();
  const name =
    isAuthenticated && user
      ? user.user_metadata.fullName?.split(' ')?.[0]
      : null;

  return <AccountEnter className={className} name={name} onExit={logout} />;
}

export default AccountEnterContainer;
