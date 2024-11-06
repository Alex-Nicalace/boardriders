import './PersonalInfo.scss';
import { TPersonalInfoProps } from './PersonalInfo.types';

function PersonalInfo({ className, data }: TPersonalInfoProps): JSX.Element {
  return (
    <div className={['personal-info', className].filter(Boolean).join(' ')}>
      {data.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
}

export default PersonalInfo;
