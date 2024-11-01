import { useScreenWidth } from '../../Context/useScreenWidthContext';
import Accordion from '../../component-library/Accordion';
import OrderStatusDetailsContainer from '../../features/makeOrder/OrderStatusDetailsContainer';
import OrderStatus from '../OrderStatus';
import './OrderStatusAccordion.scss';
import { TOrderStatusAccordionProps } from './OrderStatusAccordion.types';

function OrderStatusAccordion({
  className,
  data,
}: TOrderStatusAccordionProps): JSX.Element {
  const { isLessMobile } = useScreenWidth();

  return (
    <Accordion
      className={['order-status-accordion', className]
        .filter(Boolean)
        .join(' ')}
      itemSettings={{
        className: 'order-status-accordion__item',
        summaryProps: { className: 'order-status-accordion__summary' },
        contentProps: { className: 'order-status-accordion__content' },
      }}
    >
      {data.map((item) => (
        <Accordion.Item
          key={item.id}
          id={item.id.toString()}
          summaryNode={(open) => (
            <>
              {(!isLessMobile || (open && isLessMobile)) && (
                <span className="order-status-accordion__box-marker">
                  <span className="order-status-accordion__marker"></span>
                  Подробности
                </span>
              )}

              {!open && (
                <OrderStatus
                  className="order-status-accordion__status"
                  data={item}
                  mode={isLessMobile ? 'compact' : 'large'}
                />
              )}
            </>
          )}
          contentNode={<OrderStatusDetailsContainer orderId={item.id} />}
        />
      ))}
    </Accordion>
  );
}

export default OrderStatusAccordion;
