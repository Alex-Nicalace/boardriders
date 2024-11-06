import { useMemo } from 'react';
import AccountPersanalData from '../../components/AccountPersanalData';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import { useUser } from './useUser';

type TAccountPersanalDataContainerProps = { className?: string };
function AccountPersanalDataContainer({
  className,
}: TAccountPersanalDataContainerProps): JSX.Element {
  const { user, isLoading, error } = useUser();
  const { firstName, lastName, middleName, sex, phone, email, dateBirth } =
    user?.user_metadata || {};
  const data = useMemo(
    () => ({
      fullName: `${lastName} ${firstName} ${middleName}`,
      firstName,
      lastName,
      middleName,
      sex,
      phone,
      email,
      dateBirth: dateBirth ? new Date(dateBirth) : null,
    }),
    [firstName, lastName, middleName, sex, phone, email, dateBirth]
  );

  if (isLoading) return <Spinner />;

  if (error) return <ErrorMessage message={error.message} />;

  return <AccountPersanalData className={className} data={data} />;
}

export default AccountPersanalDataContainer;
