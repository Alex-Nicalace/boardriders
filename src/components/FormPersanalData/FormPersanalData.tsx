import InputDate from '../ui/InputDate';
import InputStyled from '../ui/InputStyled';
import SelectLabel from '../ui/SelectLabel';
import './FormPersanalData.scss';
import Button from '../ui/Button';
import InputPasword from '../ui/InputPasword';

type TFormPersanalDataProps = {
  className?: string;
  mode: 'personal-data' | 'change-password';
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};
function FormPersanalData({
  className,
  mode,
  onSubmit,
}: TFormPersanalDataProps): JSX.Element {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.(e);
  }

  return (
    <form
      className={['form-persanal-data', className].filter(Boolean).join(' ')}
      onSubmit={handleSubmit}
    >
      {mode === 'personal-data' && (
        <>
          <InputStyled name="firstName" label="Имя" isGrayLabel />
          <InputStyled name="lastName" label="Фамилия" isGrayLabel />
          <InputStyled name="middleName" label="Отчество" isGrayLabel />
          <div className="form-persanal-data__row">
            <SelectLabel
              name="sex"
              label="Пол"
              isGrayLabel
              placreholder="Ваш пол"
            >
              {['Женщина', 'Мужчина'].map((sex) => (
                <SelectLabel.Option key={sex} value={sex}>
                  {sex}
                </SelectLabel.Option>
              ))}
            </SelectLabel>
            <InputDate name="birthday" label="Дата рождения" />
          </div>
          <InputStyled
            name="phone"
            label="Номер мобильного"
            isGrayLabel
            placeholder="+7 ( ХХХ) ХХХ ХХ ХХ"
          />
          <InputStyled
            name="email"
            label="Email"
            isGrayLabel
            placeholder="Введите ваш Email"
          />
        </>
      )}
      {mode === 'change-password' && (
        <>
          <InputPasword
            name="currentPassword"
            label="Текущий пароль"
            isGrayLabel
            defaultPasswordShow
          />
          <InputPasword name="newPassword" label="Новый пароль" isGrayLabel />
          <InputPasword
            name="repeatPassword"
            label="Повторить пароль"
            isGrayLabel
          />
        </>
      )}
      <Button className="form-persanal-data__btn" fullWidth>
        {mode === 'personal-data' && 'Сохранить'}
        {mode === 'change-password' && ' Изменить пароль'}
      </Button>
    </form>
  );
}

export default FormPersanalData;
