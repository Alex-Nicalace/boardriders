import { HTMLAttributes, useState } from 'react';
import { AccordionContext } from './AccordionContext';
import Details, { TDetailsProps } from '../Details';
import { useAccordionContext } from './useAccordionContext';
import { useOutsideClick } from '../../hooks/useOutsideClick';

type TAccordionProps = HTMLAttributes<HTMLDivElement> & {
  isSingleOpen?: boolean;
  itemSettings?: TDetailsProps;
  closeOnOutsideClick?: boolean;
};
function Accordion({
  children,
  isSingleOpen = false,
  itemSettings = {},
  closeOnOutsideClick = false,
  ...props
}: TAccordionProps): JSX.Element {
  const [openId, setOpenId] = useState<string[]>([]);
  const detailsRef = useOutsideClick<HTMLDivElement>(() => {
    setOpenId([]);
  }, !closeOnOutsideClick);

  function toggle(id: string) {
    if (openId.includes(id)) {
      setOpenId(openId.filter((item) => item !== id));
    } else {
      const newOpenId = isSingleOpen ? [id] : [...openId, id];
      setOpenId(newOpenId);
    }
  }
  function isItemExpanded(id: string) {
    return openId.includes(id);
  }

  return (
    <AccordionContext.Provider
      value={{ toggle, isItemExpanded, itemCommonProps: itemSettings }}
    >
      <div {...props} ref={detailsRef}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

type TItemProps = Omit<TDetailsProps, 'open'> & { id: string };
function Item({ id, ...props }: TItemProps): JSX.Element {
  const { isItemExpanded, toggle, itemCommonProps } = useAccordionContext();

  return (
    <Details
      {...itemCommonProps}
      {...props}
      open={isItemExpanded(id)}
      onChange={() => toggle(id)}
    />
  );
}

Accordion.Item = Item;

export default Accordion;
