import { useForm } from 'react-hook-form';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import Button from '../ui/Button';
import InputStyled from '../ui/InputStyled';
import './FormAddress.scss';
import { TFormAddressProps } from './FormAddress.types';
import { MSG_REQUIRED } from '../../constants';

// TODO: надо подумать что передавать в редактируемое окно
//если нужно редактировать адрес что то побобное в CabinRow

function FormAddress({
  className,
  addressToEdit,
  disabled,
  onSubmit = () => {},
}: TFormAddressProps): JSX.Element {
  const { isLessMobileSmall } = useScreenWidth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: addressToEdit,
  });

  return (
    <form
      className={['form-address', className].filter(Boolean).join(' ')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="form-address__title">Добавить адрес</h1>
      <fieldset className="form-address__fields" disabled={disabled}>
        <InputStyled
          label="Страна"
          isGrayLabel
          {...register('country', { required: MSG_REQUIRED })}
          error={errors.country?.message}
        />
        <InputStyled label="Область" isGrayLabel {...register('region')} />
        <InputStyled
          label="Город"
          isGrayLabel
          {...register('city', { required: MSG_REQUIRED })}
          error={errors.city?.message}
        />
        <InputStyled label="Улица" isGrayLabel {...register('street')} />
        <div className="form-address__row">
          <InputStyled
            label={isLessMobileSmall ? 'Индекс' : 'Почтовый индекс'}
            isGrayLabel
            {...register('index', {
              required: MSG_REQUIRED,
              pattern: { value: /\d{6}/, message: 'Некорректный индекс' },
            })}
            error={errors.index?.message}
            hint="6 цифр"
            positionError="bottom"
          />
          <InputStyled
            label={isLessMobileSmall ? 'Дом' : 'Номер дома'}
            inputMode="numeric"
            isGrayLabel
            {...register('house', { required: MSG_REQUIRED })}
            error={errors.house?.message}
            positionError="bottom"
          />
          <InputStyled
            label={isLessMobileSmall ? 'Квартира' : 'Номер квартиры'}
            inputMode="numeric"
            isGrayLabel
            {...register('apartment')}
          />
        </div>
      </fieldset>
      <div className="form-address__btn">
        <Button fullWidth disabled={disabled}>
          {addressToEdit ? 'Сохранить' : 'Добавить'}
        </Button>
      </div>
    </form>
  );
}

export default FormAddress;
