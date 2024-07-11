import { useScreenWidth } from '../../Context/useScreenWidthContext';
import Button from '../ui/Button';
import InputStyled from '../ui/InputStyled';
import './FormAddress.scss';

// TODO: надо подумать что передавать в редактируемое окно
type TFormAddressProps = {
  className?: string;
  addressToEdit?: string; //если нужно редактировать адрес что то побобное в CabinRow
};
function FormAddress({
  className,
  addressToEdit,
}: TFormAddressProps): JSX.Element {
  const { isLessMobileSmall } = useScreenWidth();
  console.log(addressToEdit);

  return (
    <form className={['form-address', className].filter(Boolean).join(' ')}>
      <h1 className="form-address__title">Добавить адрес</h1>
      <div className="form-address__fields">
        <InputStyled name="country" label="Страна" isGrayLabel />
        <InputStyled name="region" label="Область" isGrayLabel />
        <InputStyled name="city" label="Город" isGrayLabel />
        <InputStyled name="street" label="Улица" isGrayLabel />
        <div className="form-address__row">
          <InputStyled
            name="index"
            label={isLessMobileSmall ? 'Индекс' : 'Почтовый индекс'}
            isGrayLabel
          />
          <InputStyled
            name="house"
            label={isLessMobileSmall ? 'Дом' : 'Номер дома'}
            isGrayLabel
          />
          <InputStyled
            name="apartment"
            label={isLessMobileSmall ? 'Квартира' : 'Номер квартиры'}
            isGrayLabel
          />
        </div>
      </div>
      <div className="form-address__btn">
        <Button fullWidth>Добавить</Button>
      </div>
    </form>
  );
}

export default FormAddress;
