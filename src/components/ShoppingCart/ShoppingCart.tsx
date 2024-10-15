import './ShoppingCart.scss';
import StepNumber from '../StepNumber';
import Button from '../ui/Button';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import { getDeclension } from '../../utils/getDeclension';
import { formaterCurrency, formaterDecimal } from '../../utils/formaters';

type TShoppingСartProps = {
  className?: string;
  countItems: number;
  dataSteps: {
    nameStep: string;
    value?: string;
    disabled?: boolean;
    isDone?: boolean;
  }[];
  totalPrice: number;
  points: number;
};
function ShoppingCart({
  className,
  countItems,
  dataSteps,
  totalPrice,
  points,
}: TShoppingСartProps): JSX.Element {
  const { isLessMobile } = useScreenWidth();
  const isCanPay = dataSteps.every(({ isDone }) => isDone);

  return (
    <div className={['shopping-cart', className].filter(Boolean).join(' ')}>
      <div className="shopping-cart__title">
        {isLessMobile && (
          <span className="shopping-cart__label">Проверка заказа:</span>
        )}
        <span>
          {`${countItems} ${getDeclension(
            countItems,
            'товар',
            'товара',
            'товаров'
          )}`}
        </span>
      </div>

      <ol className="shopping-cart__list">
        {dataSteps.map(({ nameStep, value, disabled, isDone }, index) => (
          <li
            className={[
              'shopping-cart__item',
              disabled && 'shopping-cart__item_disabled',
            ]
              .filter(Boolean)
              .join(' ')}
            key={nameStep}
          >
            <StepNumber
              className="shopping-cart__step"
              stepNum={index + 1}
              disabled={disabled}
              isDone={isDone}
            />
            <span className="shopping-cart__name-item">{nameStep}</span>
            {value && (
              <span className="shopping-cart__value-item">{value}</span>
            )}
          </li>
        ))}
      </ol>

      <div className="shopping-cart__totals">
        <div className="shopping-cart__total">
          <span className="shopping-cart__total-text">Итого:</span>
          <span className="shopping-cart__total-value">
            {formaterCurrency(totalPrice)}
          </span>
        </div>

        <div className="shopping-cart__points">
          <span className="shopping-cart__points-text">Баллы за покупку:</span>
          <span className="shopping-cart__points-value">
            +{formaterDecimal(points)} баллов
          </span>
        </div>
      </div>

      <div className="shopping-cart__wrapper-buttons">
        <Button
          className="shopping-cart__button"
          variant="contained"
          color="secondary"
          nameColor="green"
          disabled={!isCanPay}
          fullWidth
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default ShoppingCart;
