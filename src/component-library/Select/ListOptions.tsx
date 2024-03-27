import { Children, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLockDocumentScroll } from '../../hooks/useLockDocumentScroll';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import extractTextFromReactNode from '../../utils/extractTextFromReactNode';

type ListOptionsProps = {
  children: React.ReactNode;
  selectRef: React.RefObject<HTMLDivElement>;
  className?: string;
  isLockScroll: boolean;
  isSearchable: boolean;
  close: () => void;
};
function ListOptions({
  children,
  selectRef,
  className = '',
  isLockScroll,
  isSearchable,
  close,
}: ListOptionsProps) {
  const [serachValue, setSerachValue] = useState('');
  useLockDocumentScroll(!isLockScroll);
  const listElRef = useOutsideClick<HTMLDivElement>((e) => {
    if (e.target instanceof Element) {
      if (selectRef.current?.contains(e.target)) return;
      close();
    }
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(function setPositionListOptions() {
    const listEl = listElRef.current;
    if (!listEl || !selectRef.current) return;

    const selectRect = selectRef.current.getBoundingClientRect();
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    const heightListOptions = listEl.scrollHeight;
    const widthListOptions = listEl.scrollWidth;
    const horizontalPosition =
      selectRect.left + widthListOptions > clientWidth ? 'right' : 'left';
    const isListOptionsBelowViewport =
      selectRect.bottom + heightListOptions > clientHeight;
    const cssText = listEl.style.cssText; // запоминаем стили, чтобы потом вернуть их

    if (isLockScroll) {
      listEl.style.position = 'fixed';
      listEl.style[horizontalPosition] =
        horizontalPosition === 'left'
          ? selectRect.left + 'px'
          : window.innerWidth - selectRect.right + 'px';
      listEl.style.top = isListOptionsBelowViewport
        ? selectRect.bottom - heightListOptions - selectRect.height / 2 + 'px'
        : selectRect.bottom + 'px';
      listEl.style.minWidth = selectRect.width + 'px'; // подстраиваем ширину списка по ширине кнопки
    } else {
      listEl.style.position = 'absolute';
      listEl.style[horizontalPosition] = '0';
      listEl.style.top = isListOptionsBelowViewport
        ? -(heightListOptions - selectRect.height / 2) + 'px'
        : '100%';
    }

    return () => {
      listEl.style.cssText = cssText; // вернуть стили - очистка эффекта
    };
  });

  function filterOptions(children: React.ReactNode) {
    if (!isSearchable) return children;

    return Children.toArray(children).filter((child) =>
      extractTextFromReactNode(child)
        .toLowerCase()
        .includes(serachValue.toLowerCase())
    );
  }

  const listOptionsElement = (
    <div ref={listElRef} className={`options ${className}`} tabIndex={-1}>
      <div className="options__wrapper">
        {isSearchable && (
          <div className="options__search">
            <input
              ref={inputRef}
              className="options__search-input"
              value={serachValue}
              onChange={(e) => setSerachValue(e.target.value)}
            />
          </div>
        )}
        <ul className="options__items" role="listbox" tabIndex={-1}>
          {filterOptions(children)}
        </ul>
      </div>
    </div>
  );

  if (isLockScroll) return createPortal(listOptionsElement, document.body);

  return listOptionsElement;
}

export default ListOptions;
