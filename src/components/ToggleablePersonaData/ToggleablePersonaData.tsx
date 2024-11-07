import './ToggleablePersonaData.scss';
import FormPersanalData from '../FormPersanalData';
import PersonalInfo, { KEYS_FOR_PERSONAL_INFO } from '../PersonalInfo';
import { formaterDateShort } from '../../utils/formaters';
import { TToggleablePersonaDataProps } from './ToggleablePersonaData.types';
import { useState } from 'react';
import AccounPersanalDataProvider from '../../features/authentication/AccounPersanalDataProvider';

function ToggleablePersonaData({
  className,
  mode,
}: TToggleablePersonaDataProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      className={['toggleable-persona-data', className]
        .filter(Boolean)
        .join(' ')}
    >
      <AccounPersanalDataProvider
        render={({ data, mutateData, isUpdatingUser }) => {
          const personalInfoData = (
            mode === 'personal-data'
              ? KEYS_FOR_PERSONAL_INFO.map((item) =>
                  data[item] instanceof Date
                    ? formaterDateShort(data[item])
                    : data[item]
                )
              : ['*'.repeat(15)]
          ).filter((item): item is string => Boolean(item));

          return isEditing ? (
            <FormPersanalData
              mode={mode}
              values={data}
              disabled={isUpdatingUser}
              className="toggleable-persona-data__form"
              onSubmit={(data) =>
                mutateData(data, {
                  onSuccess: () => setIsEditing(false),
                })
              }
            />
          ) : (
            <>
              <PersonalInfo
                className="toggleable-persona-data__personal-info"
                data={personalInfoData}
              />
              <button
                className="toggleable-persona-data__btn"
                onClick={() => setIsEditing(true)}
              >
                Редактировать
              </button>
            </>
          );
        }}
      />
    </div>
  );
}

export default ToggleablePersonaData;
