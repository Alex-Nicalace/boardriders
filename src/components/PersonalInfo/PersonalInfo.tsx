import './PersonalInfo.scss';

type TPersonalInfoProps = {
  className?: string;
  data: string[];
};
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
