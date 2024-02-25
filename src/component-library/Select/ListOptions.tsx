import { Children, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLockDocumentScroll } from '../../hooks/useLockDocumentScroll';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useSelectContext } from './useSelectContext';
import extractTextFromReactNode from '../../utils/extractTextFromReactNode';

type ListOptionsProps = {
  children: React.ReactNode;
  className?: string;
};
function ListOptions({ children, className = '' }: ListOptionsProps) {
  const { isLockScroll, close, triggerEl, isClosing, closing, isSearchable } =
    useSelectContext();
  const [serachValue, setSerachValue] = useState('');
  useLockDocumentScroll(!isLockScroll);
  const listElRef = useOutsideClick<HTMLDivElement>(closing);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(function setPositionListOptions() {
    const listEl = listElRef.current;
    if (!listEl || !triggerEl) return;

    const triggerRect = triggerEl.getBoundingClientRect();
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    const heightListOptions = listEl.scrollHeight;
    const widthListOptions = listEl.scrollWidth;
    const horizontalPosition =
      triggerRect.left + widthListOptions > clientWidth ? 'right' : 'left';
    const isListOptionsBelowViewport =
      triggerRect.bottom + heightListOptions > clientHeight;

    if (isLockScroll) {
      listEl.style.position = 'fixed';
      listEl.style[horizontalPosition] =
        horizontalPosition === 'left'
          ? triggerRect.left + 'px'
          : window.innerWidth - triggerRect.right + 'px';
      listEl.style.top = isListOptionsBelowViewport
        ? triggerRect.bottom - heightListOptions - triggerRect.height / 2 + 'px'
        : triggerRect.bottom + 'px';
    } else {
      listEl.style.position = 'absolute';
      listEl.style[horizontalPosition] = '0';
      listEl.style.top = isListOptionsBelowViewport
        ? -(heightListOptions - triggerRect.height / 2) + 'px'
        : '100%';
    }

    listEl.classList.add('options_opened');

    return () => {
      listEl.classList.remove('options_opened');
    };
  });

  useEffect(function closeListOptions() {
    if (!isClosing) return;

    const listEl = listElRef.current;
    if (!listEl) return;
    listEl.classList.remove('options_opened');

    return () => {
      listEl.classList.add('options_opened');
    };
  });

  function handleAnimationEnd(e: React.TransitionEvent<HTMLDivElement>) {
    // фокус можно осуществить только после завершения анимации
    inputRef.current?.focus();

    if (!isClosing) return;

    if (e.target === listElRef.current) close();
  }

  function filterOptions(children: React.ReactNode) {
    if (!isSearchable) return children;

    return Children.toArray(children).filter((child) =>
      extractTextFromReactNode(child)
        .toLowerCase()
        .includes(serachValue.toLowerCase())
    );
  }

  const listOptionsElement = (
    <div
      ref={listElRef}
      className={`${className} options`}
      tabIndex={-1}
      onTransitionEnd={handleAnimationEnd}
    >
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
