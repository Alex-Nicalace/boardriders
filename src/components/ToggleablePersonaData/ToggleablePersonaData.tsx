import { ComponentProps } from 'react';
import './ToggleablePersonaData.scss';
import FormPersanalData from '../FormPersanalData';
import PersonalInfo from '../PersonalInfo';

const PERSONAL_INFO = {
  fullName: 'Иванов Иван Иванович',
  sex: 1,
  dateBirth: new Date('1988-10-15'),
  phone: '+7 (950) 145 22 55',
  email: 'ivanov@gmail.com',
};
const PERSONAL_PASSWORD = {
  password: '12345678',
};

type TMode = ComponentProps<typeof FormPersanalData>['mode'];
type TToggleablePersonaDataProps = {
  className?: string;
  mode: TMode;
  isEdit: boolean;
  onToggle?: (value: boolean) => void;
};
function ToggleablePersonaData({
  className,
  mode,
  isEdit,
  onToggle,
}: TToggleablePersonaDataProps): JSX.Element {
  const personalInfoProps =
    mode === 'personal-data' ? PERSONAL_INFO : PERSONAL_PASSWORD;

  return (
    <div
      className={['toggleable-persona-data', className]
        .filter(Boolean)
        .join(' ')}
    >
      {isEdit ? (
        <FormPersanalData
          className="toggleable-persona-data__form"
          mode={mode}
          onSubmit={() => onToggle?.(false)}
        />
      ) : (
        <>
          <PersonalInfo
            className="toggleable-persona-data__personal-info"
            {...personalInfoProps}
          />
          <button
            className="toggleable-persona-data__btn"
            onClick={() => onToggle?.(true)}
          >
            Редактировать
          </button>
        </>
      )}
    </div>
  );
}

export default ToggleablePersonaData;
