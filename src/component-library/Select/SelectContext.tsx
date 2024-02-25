import { createContext } from 'react';

interface ISelectContext {
  selected: string | string[] | undefined;
  close(): void;
  onClickOfListItem: (value: string) => void;
  isLockScroll: boolean;
  triggerEl: Element | null;
  isClosing: boolean;
  closing(): void;
  isSearchable: boolean;
}

export const SelectContext = createContext<ISelectContext>({
  selected: '',
  close() {},
  onClickOfListItem() {},
  isLockScroll: true,
  triggerEl: null,
  isClosing: false,
  closing() {},
  isSearchable: false,
});
