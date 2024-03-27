import { createContext } from 'react';

interface ISelectContext {
  selected: string | string[] | undefined;
  onClickOfListItem: (value: string) => void;
}

export const SelectContext = createContext<ISelectContext>({
  selected: '',
  onClickOfListItem() {},
});
