import { Children, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLockDocumentScroll } from '../../hooks/useLockDocumentScroll';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import extractTextFromReactNode from '../../utils/extractTextFromReactNode';
import { useSelectContext } from './useSelectContext';
import {
  IListOptionsCustomCSSProperties,
  ListOptionsProps,
} from './Select.types';

function ListOptions({
  children,
  selectRef,
  className,
  isLockScroll,
  isSearchable,
  close,
  shouldFocus = true,
  transitionDuration = 300,
}: ListOptionsProps) {
  const [serachValue, setSerachValue] = useState('');
  useLockDocumentScroll(!isLockScroll);
  const listElRef = useOutsideClick<HTMLDivElement>((e) => {
    const target = e.target;
    const selectContainerEl = selectRef.current;

    if (!(target instanceof Element)) return;
    if (selectContainerEl?.contains(target)) return;

    const inputId = selectContainerEl?.querySelector('input[id]')?.id;
    const labelFor = target.closest('label[for]')?.getAttribute('for');
    if (inputId && labelFor && inputId === labelFor) return;

    close();
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const { getMapItems, selected } = useSelectContext();

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

  useEffect(
    function setFocus() {
      if (!shouldFocus || typeof selected !== 'string') return;

      // фокус на выбранную опцию или на первую опцию
      if (selected) {
        getMapItems().get(selected)?.focus();
      } else {
        Array.from(getMapItems())[0]?.[1].focus();
      }
    },
    [shouldFocus, getMapItems, selected]
  );

  useEffect(
    function setFocus() {
      if (!shouldFocus) return;

      inputRef.current?.focus();
    },
    [shouldFocus]
  );

  /**
   * фильтруем список опции по введенному значению
   */
  function filterOptions(children: React.ReactNode) {
    if (!isSearchable) return children;

    return Children.toArray(children).filter((child) =>
      extractTextFromReactNode(child)
        .toLowerCase()
        .includes(serachValue.toLowerCase())
    );
  }

  /**
   * если нажали escape или tab - закрывать список
   */
  function handleOptionsKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape' || e.key === 'Tab') {
      e.preventDefault();
      close(); // если нажали escape или tab - закрывать список
      const selectWrapperEl = selectRef.current?.firstElementChild;
      if (selectWrapperEl && selectWrapperEl instanceof HTMLElement)
        selectWrapperEl.focus();
    }
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      Array.from(getMapItems())[0]?.[1].focus();
    }
  }

  const style: IListOptionsCustomCSSProperties = {
    '--select-options-transition-duration': transitionDuration + 'ms',
    ...(isLockScroll && { position: 'fixed' }),
  };

  const listOptionsElement = (
    <div
      ref={listElRef}
      className={['options', className].filter(Boolean).join(' ')}
      tabIndex={-1}
      onKeyDown={handleOptionsKeyDown}
      style={style}
    >
      <div className="options__wrapper">
        {isSearchable && (
          <div className="options__search">
            <input
              ref={inputRef}
              className="options__search-input"
              value={serachValue}
              onChange={(e) => setSerachValue(e.target.value)}
              onKeyDown={handleSearchKeyDown}
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
