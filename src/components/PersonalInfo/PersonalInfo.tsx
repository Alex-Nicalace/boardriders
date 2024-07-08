import { useFormaters } from '../../Context/useFormaters';
import './PersonalInfo.scss';

enum SEX {
  Женский,
  Мужской,
}

type TPersonalInfoProps = {
  className?: string;
  fullName?: string;
  sex?: SEX;
  dateBirth?: Date;
  phone?: string;
  email?: string;
  password?: string;
};
function PersonalInfo({
  className,
  fullName,
  sex,
  dateBirth,
  phone,
  email,
  password,
}: TPersonalInfoProps): JSX.Element {
  const { formaterDateShort } = useFormaters();

  return (
    <div className={['personal-info', className].filter(Boolean).join(' ')}>
      {fullName && <p>{fullName}</p>}
      {sex && <p>{SEX[sex]}</p>}
      {dateBirth && <p>{formaterDateShort(dateBirth)}</p>}
      {phone && <p>{phone}</p>}
      {email && <p>{email}</p>}
      {password && <p>Пароль: {'*'.repeat(password.length)}</p>}
    </div>
  );
}

export default PersonalInfo;
