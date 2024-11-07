import { useMemo } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import { useUser } from './useUser';
import { TAccounPersonalData, TMutateDataArgs } from './authentication.types';
import { useUpdateUser } from './useUpdateUser';

type TAccounPersanalDataProviderProps = {
  render: (args: {
    data: TAccounPersonalData;
    mutateData: (...args: TMutateDataArgs) => void;
    isUpdatingUser: boolean;
  }) => JSX.Element;
};
function AccounPersanalDataProvider({
  render,
}: TAccounPersanalDataProviderProps): JSX.Element {
  const { user, isLoading, error } = useUser();
  // const { phone, email, user_metadata = {} } = user || {};
  const { firstName, lastName, middleName, sex, dateBirth, phone, email } =
    user?.user_metadata || {};
  const { updateCurrentUser, isUpdatingUser } = useUpdateUser();

  function mutateData(...args: TMutateDataArgs) {
    const [data, options] = args;
    const dateBirth = data.dateBirth ? data.dateBirth.toISOString() : undefined;
    const fullName = [data.lastName, data.firstName, data.middleName]
      .filter(Boolean)
      .join(' ');
    updateCurrentUser({ ...data, dateBirth, fullName }, options);
  }

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

  return <>{render({ data, mutateData, isUpdatingUser })}</>;
}

export default AccounPersanalDataProvider;
