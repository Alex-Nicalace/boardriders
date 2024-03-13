import { HTMLAttributes, useState } from 'react';
import { AccordionContext } from './AccordionContext';
import Details, { TDetailsProps } from '../Details';
import { useAccordionContext } from './useAccordionContext';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import useMatchMedia from '../../hooks/useMatchMedia';

type TAccordionProps = HTMLAttributes<HTMLDivElement> & {
  isSingleOpen?: boolean;
  itemSettings?: TDetailsProps;
  closeOnOutsideClick?: boolean;
  responsive?: {
    screenWidth: number;
    triggerOnWidth?: 'min-width' | 'max-width';
  };
  nameAlwaysOpenAttribute?: string;
};
function Accordion({
  children,
  isSingleOpen = false,
  itemSettings = {},
  closeOnOutsideClick = false,
  responsive,
  nameAlwaysOpenAttribute = 'data-always-open',
  ...props
}: TAccordionProps): JSX.Element {
  const [openId, setOpenId] = useState<string[]>([]);
  const detailsRef = useOutsideClick<HTMLDivElement>(() => {
    setOpenId([]);
  }, !closeOnOutsideClick);
  const { screenWidth, triggerOnWidth = 'max-width' } = responsive || {};
  const mediaQuery = responsive ? `(${triggerOnWidth}: ${screenWidth}px)` : '';
  const [isMatch] = useMatchMedia([mediaQuery]);
  const isAllExpanded = isMatch === false;

  console.log(isMatch);

  function toggle(id: string) {
    if (isAllExpanded) return;

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
      value={{
        toggle,
        isItemExpanded,
        itemCommonProps: itemSettings,
        isAllExpanded,
        nameAlwaysOpenAttribute,
      }}
    >
      <div {...props} ref={detailsRef}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

type TItemProps = Omit<TDetailsProps, 'open'> & { id: string };
function Item({ id, ...props }: TItemProps): JSX.Element {
  const {
    isItemExpanded,
    toggle,
    itemCommonProps,
    isAllExpanded,
    nameAlwaysOpenAttribute,
  } = useAccordionContext();

  return (
    <Details
      {...itemCommonProps}
      {...props}
      open={isAllExpanded || isItemExpanded(id)}
      onChange={() => toggle(id)}
      {...(isAllExpanded &&
        nameAlwaysOpenAttribute && { [nameAlwaysOpenAttribute]: true })}
    />
  );
}

Accordion.Item = Item;

export default Accordion;
