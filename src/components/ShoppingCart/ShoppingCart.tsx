import './ShoppingCart.scss';
import StepNumber from '../StepNumber';
import Button from '../ui/Button';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import { useFormaters } from '../../Context/useFormaters';

type TShoppingСartProps = {
  countItems: number;
  dataSteps: {
    stepNum: number;
    name: string;
    value?: string;
    disabled?: boolean;
    isDone?: boolean;
  }[];
  totalPrice: number;
  points: number;
};
function ShoppingCart({
  countItems,
  dataSteps,
  totalPrice,
  points,
}: TShoppingСartProps): JSX.Element {
  const { isLessMobile } = useScreenWidth();
  const { formaterCurrency, formaterDecimal } = useFormaters();
  const isCanPay = dataSteps.every(({ isDone }) => isDone);

  return (
    <div className="shopping-cart">
      <div className="shopping-cart__title">
        {isLessMobile && (
          <span className="shopping-cart__label">Проверка заказа:</span>
        )}
        <span>{countItems} товар(а)</span>
      </div>

      <ol className="shopping-cart__list">
        {dataSteps.map(({ stepNum, name, value, disabled, isDone }) => (
          <li
            className={[
              'shopping-cart__item',
              disabled && 'shopping-cart__item_disabled',
            ]
              .filter(Boolean)
              .join(' ')}
            key={stepNum}
          >
            <StepNumber
              className="shopping-cart__step"
              stepNum={stepNum}
              disabled={disabled}
              isDone={isDone}
            />
            <span className="shopping-cart__name-item">{name}</span>
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
