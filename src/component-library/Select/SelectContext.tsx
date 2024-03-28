import { createContext } from 'react';

interface ISelectContext {
  selected: string | string[] | undefined;
  clickItem: (value: string) => void;
  getMapItems: () => Map<string, HTMLLIElement>;
}

export const SelectContext = createContext<ISelectContext>({
  selected: '',
  clickItem() {},
  getMapItems() {
    return new Map();
  },
});
