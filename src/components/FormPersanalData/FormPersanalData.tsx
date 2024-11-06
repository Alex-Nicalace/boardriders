import { FieldErrors, useForm } from 'react-hook-form';
import { InputDateControl } from '../ui/InputDate';
import InputStyled from '../ui/InputStyled';
import SelectLabel, { SelectLabelControl } from '../ui/SelectLabel';
import './FormPersanalData.scss';
import Button from '../ui/Button';
import InputPasword from '../ui/InputPasword';
import {
  TChangePasswordInputs,
  TFormInputs,
  TFormPersanalDataProps,
  TPersanalDataInputs,
} from './FormPersanalData.types';
import {
  EMAIL_REGEX,
  MSG_REQUIRED,
  PASSWORD_MIN_LENGTH,
  PHONE_MASK,
  PHONE_REGEX,
} from '../../constants';
import { registerMask } from '../../utils/registerMask';

function FormPersanalData({
  className,
  mode,
  disabled,
  values,
  onSubmit,
}: TFormPersanalDataProps): JSX.Element {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ values });

  function onSubmitHandle(data: TFormInputs<typeof mode>) {
    onSubmit?.(data);
  }

  const {
    onChange: handleChangePhone,
    onBlur: handleBlurPhone,
    onFocus: handleFocusPhone,
  } = registerMask(PHONE_MASK, {
    setValue: (value) => setValue('phone', value, { shouldValidate: true }),
  });

  return (
    <form
      className={['form-persanal-data', className].filter(Boolean).join(' ')}
      onSubmit={handleSubmit(onSubmitHandle)}
    >
      {mode === 'personal-data' && (
        <>
          <InputStyled
            label="Имя*"
            isGrayLabel
            disabled={disabled}
            {...register('firstName', { required: MSG_REQUIRED })}
            error={
              (errors as FieldErrors<TPersanalDataInputs>).firstName?.message
            }
          />
          <InputStyled
            label="Фамилия*"
            isGrayLabel
            disabled={disabled}
            {...register('lastName', { required: MSG_REQUIRED })}
            error={
              (errors as FieldErrors<TPersanalDataInputs>).lastName?.message
            }
          />
          <InputStyled
            label="Отчество"
            isGrayLabel
            disabled={disabled}
            {...register('middleName')}
          />
          <div className="form-persanal-data__row">
            <SelectLabelControl
              label="Пол*"
              isGrayLabel
              disabled={disabled}
              placreholder="Ваш пол"
              control={control}
              name="sex"
              rules={{ required: MSG_REQUIRED }}
            >
              {['Женщина', 'Мужчина'].map((sex) => (
                <SelectLabel.Option key={sex} value={sex}>
                  {sex}
                </SelectLabel.Option>
              ))}
            </SelectLabelControl>
            <InputDateControl
              label="Дата рождения*"
              disabled={disabled}
              control={control}
              name="dateBirth"
              rules={{ required: MSG_REQUIRED }}
            />
          </div>
          <InputStyled
            label="Номер телефона*"
            isGrayLabel
            disabled={disabled}
            type="tel"
            placeholder={PHONE_MASK}
            {...register('phone', {
              required: MSG_REQUIRED,
              onChange: handleChangePhone,
              onBlur: handleBlurPhone,
              pattern: {
                value: PHONE_REGEX,
                message: 'Некорректный телефон',
              },
            })}
            onFocus={handleFocusPhone as any}
            value={watch('phone') || ''}
            error={(errors as FieldErrors<TPersanalDataInputs>).phone?.message}
          />
          <InputStyled
            label="Email*"
            isGrayLabel
            disabled={disabled}
            placeholder="Введите ваш Email"
            {...register('email', {
              required: MSG_REQUIRED,
              pattern: {
                value: EMAIL_REGEX,
                message: 'Некорректный email',
              },
            })}
            error={(errors as FieldErrors<TPersanalDataInputs>).email?.message}
          />
        </>
      )}
      {mode === 'change-password' && (
        <>
          <InputPasword
            label="Текущий пароль*"
            isGrayLabel
            disabled={disabled}
            defaultPasswordShow
            {...register('oldPassword', { required: MSG_REQUIRED })}
            error={
              (errors as FieldErrors<TChangePasswordInputs>).oldPassword
                ?.message
            }
          />
          <InputPasword
            label={`Новый пароль (мин. ${PASSWORD_MIN_LENGTH} символов)*`}
            isGrayLabel
            fullWidth
            disabled={disabled}
            error={
              (errors as FieldErrors<TChangePasswordInputs>).newPassword
                ?.message
            }
            {...register('newPassword', {
              required: MSG_REQUIRED,
              minLength: {
                value: PASSWORD_MIN_LENGTH,
                message: `Мин. длина ${PASSWORD_MIN_LENGTH} символов`,
              },
            })}
          />
          <InputPasword
            label="Подтвердите пароль"
            isGrayLabel
            disabled={disabled}
            fullWidth
            error={
              (errors as FieldErrors<TChangePasswordInputs>).confirmPassword
                ?.message
            }
            {...register('confirmPassword', {
              required: MSG_REQUIRED,
              validate: (value, formValues) =>
                value === (formValues as TChangePasswordInputs).newPassword ||
                'Пароли не совпадают',
            })}
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
