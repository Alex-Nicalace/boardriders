import FormPersanalData from '../FormPersanalData';
import Title from '../ui/Title';
import './AccountPersanalData.scss';

type TAccountPersanalDataProps = {
  className?: string;
};
function AccountPersanalData({
  className,
}: TAccountPersanalDataProps): JSX.Element {
  return (
    <div
      className={['account-persanal-data', className].filter(Boolean).join(' ')}
    >
      <section className="account-persanal-data__section">
        <Title className="account-persanal-data__title" as="h2" kind="h2-21-16">
          Личные данные
        </Title>
        <FormPersanalData mode="personal-data" />
      </section>
      <section className="account-persanal-data__section">
        <Title className="account-persanal-data__title" as="h2" kind="h2-21-16">
          Пароль
        </Title>
        <FormPersanalData mode="change-password" />
      </section>
    </div>
  );
}

export default AccountPersanalData;
