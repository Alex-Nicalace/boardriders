import { createContext } from 'react';
import { TDetailsProps } from '../Details';

interface IAccordionContext {
  toggle: (id: string) => void;
  isItemExpanded: (id: string) => boolean;
  itemCommonProps: TDetailsProps;
  isAllExpanded: boolean;
  nameAlwaysOpenAttribute: string;
}
export const AccordionContext = createContext<IAccordionContext>({
  toggle: () => {},
  isItemExpanded: () => false,
  itemCommonProps: {},
  isAllExpanded: false,
  nameAlwaysOpenAttribute: '',
});
