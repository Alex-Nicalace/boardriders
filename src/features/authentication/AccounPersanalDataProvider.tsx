import { useMemo } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import { useUser } from './useUser';
import { TAccounPersonalData } from './authentication.types';

type TAccounPersanalDataProviderProps = {
  render: (data: TAccounPersonalData) => JSX.Element;
};
function AccounPersanalDataProvider({
  render,
}: TAccounPersanalDataProviderProps): JSX.Element {
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

  return <>{render(data)}</>;
}

export default AccounPersanalDataProvider;
