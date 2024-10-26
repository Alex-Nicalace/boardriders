import AccountEnter from '../../components/AccountEnter';
import { useLogout } from './useLogout';
import { useUser } from './useUser';

type TAccountEnterContainerProps = {
  className?: string;
  onClickGreeting?: () => void;
};
function AccountEnterContainer({
  className,
  onClickGreeting,
}: TAccountEnterContainerProps): JSX.Element {
  const { logout } = useLogout();
  const { user } = useUser();

  const name = user?.user_metadata.fullName?.split(' ')?.[0];

  return (
    <AccountEnter
      className={className}
      name={name}
      onExit={logout}
      onClickGreeting={onClickGreeting}
    />
  );
}

export default AccountEnterContainer;
