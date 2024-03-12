import { createContext } from 'react';
import { TDetailsProps } from '../Details';

interface IAccordionContext {
  // openId: string[];
  toggle: (id: string) => void;
  isItemExpanded: (id: string) => boolean;
  itemCommonProps: TDetailsProps;
}
export const AccordionContext = createContext<IAccordionContext>({
  // openId: [],
  toggle: () => {},
  isItemExpanded: () => false,
  itemCommonProps: {},
});
