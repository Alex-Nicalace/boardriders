import { Link } from 'react-router-dom';
import './ContactOption.scss';
import InputStyled from '../ui/InputStyled';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';

// type TContactOptionProps = { }
function ContactOption(/*{ }: TContactOptionProps*/): JSX.Element {
  return (
    <div className="contact-option">
      <p className="contact-option__invitation">
        Укажите свои данные, чтобы быть в курсе изменений статуса заказа.
        Персональные данные обрабатываются в соответствии с{' '}
        <Link className="contact-option__politicy-link" to="#">
          Политикой обработки персональных данных.
        </Link>
      </p>

      <InputStyled className="contact-option__name" label="Имя" isGrayLabel />

      <InputStyled
        className="contact-option__phone"
        label="Телефон для SMS уведомлений"
        placeholder="+7 ( ХХХ) ХХХ ХХ ХХ"
        isGrayLabel
      />

      <InputStyled
        className="contact-option__email"
        label="Email"
        placeholder="Введите ваш Email"
        isGrayLabel
      />
      <div className="contact-option__mailing">
        <Checkbox label="Подписаться на рассылку" variantIcon="square" />
      </div>

      <InputStyled
        className="contact-option__comment"
        label="Комментарий к заказу"
        placeholder="Нипишите что - нибудь"
        isGrayLabel
        isTextarea
      />

      <div className="contact-option__btn-confirm">
        <Button fullWidth>Подтвердить</Button>
      </div>
    </div>
  );
}

export default ContactOption;
