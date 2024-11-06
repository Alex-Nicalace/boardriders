import './ToggleablePersonaData.scss';
import FormPersanalData from '../FormPersanalData';
import PersonalInfo from '../PersonalInfo';
import { formaterDateShort } from '../../utils/formaters';
import {
  TKeysForPersonalInfo,
  TToggleablePersonaDataProps,
} from './ToggleablePersonaData.types';

const KEYS_FOR_PERSONAL_INFO: TKeysForPersonalInfo[] = [
  'fullName',
  'sex',
  'dateBirth',
  'phone',
  'email',
];

function ToggleablePersonaData({
  className,
  isEdit,
  onToggle,
  ...props
}: TToggleablePersonaDataProps): JSX.Element {
  const personalInfoProps = (
    props.mode === 'personal-data'
      ? KEYS_FOR_PERSONAL_INFO.map((item) =>
          props.values[item] instanceof Date
            ? formaterDateShort(props.values[item])
            : props.values[item]
        )
      : [props.values.oldPassword]
  ).filter((item): item is string => Boolean(item));

  return (
    <div
      className={['toggleable-persona-data', className]
        .filter(Boolean)
        .join(' ')}
    >
      {isEdit ? (
        <FormPersanalData
          {...props}
          className="toggleable-persona-data__form"
          onSubmit={() => onToggle?.(false)}
        />
      ) : (
        <>
          <PersonalInfo
            className="toggleable-persona-data__personal-info"
            data={personalInfoProps}
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
