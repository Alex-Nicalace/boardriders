import { formaterDateShort } from '../../utils/formaters';
import './PersonalInfo.scss';

type TPersonalInfoProps = {
  className?: string;
  data: {
    fullName?: string;
    sex?: string;
    dateBirth?: Date;
    phone?: string;
    email?: string;
    password?: string;
  };
};
function PersonalInfo({ className, data }: TPersonalInfoProps): JSX.Element {
  const { fullName, sex, dateBirth, phone, email, password } = data;

  return (
    <div className={['personal-info', className].filter(Boolean).join(' ')}>
      {fullName && <p>{fullName}</p>}
      {sex && <p>{sex}</p>}
      {dateBirth && <p>{formaterDateShort(dateBirth)}</p>}
      {phone && <p>{phone}</p>}
      {email && <p>{email}</p>}
      {password && <p>Пароль: {'*'.repeat(password.length)}</p>}
    </div>
  );
}

export default PersonalInfo;
