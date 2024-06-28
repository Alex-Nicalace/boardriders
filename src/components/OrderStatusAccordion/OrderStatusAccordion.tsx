import { useScreenWidth } from '../../Context/useScreenWidthContext';
import Accordion from '../../component-library/Accordion';
import OrderStatus, { TOrderStatusData } from '../OrderStatus';
import './OrderStatusAccordion.scss';

type TOrderStatusAccordionProps = {
  className?: string;
  data: TOrderStatusData[];
};
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
          key={item.code}
          id={item.code}
          summaryNode={(open) => (
            <>
              {(!isLessMobile || (open && isLessMobile)) && (
                <span className="order-status-accordion__box-marker">
                  <span className="order-status-accordion__marker"></span>
                  Подробности
                </span>
              )}

              {(!isLessMobile || (!open && isLessMobile)) && (
                <OrderStatus
                  className="order-status-accordion__status"
                  {...item}
                  mode={isLessMobile ? 'compact' : 'large'}
                />
              )}
            </>
          )}
          contentNode={
            <>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam iure
              libero necessitatibus, dignissimos provident qui inventore eius
              maiores labore illum, aperiam consectetur vel eos et autem quo,
              nihil nobis reprehenderit?
            </>
          }
        />
      ))}
    </Accordion>
  );
}

export default OrderStatusAccordion;
