import { Link } from 'react-router-dom';
import IconButton from '../../../components/ui/IconButton';
import { AvatarIcon } from '../../../components/ui/Icons';
import { useUser } from '../useUser';
import './AccountButton.scss';
import MediaQuery from '../../../component-library/MediaQuery';

// type TAccountButtonProps = { }
function AccountButton(/*{ }: TAccountButtonProps*/): JSX.Element {
  const { isAuthenticated, user } = useUser();

  if (!isAuthenticated || !user) {
    return (
      <IconButton to="#login" IconComponent={AvatarIcon}>
        Войти
      </IconButton>
    );
  }

  const { fullName = 'Неизвестный пользователь' } = user.user_metadata;
  const shortName = fullName
    .split(' ')
    .slice(0, 2)
    .map((name) => name[0])
    .join('');

  return (
    <Link className="account-button" to="/account">
      <span className="account-button__name">{shortName}</span>
      <MediaQuery minWidth="tablet">
        <span className="account-button__text">Аккаунт</span>
      </MediaQuery>
    </Link>
  );
}

export default AccountButton;
