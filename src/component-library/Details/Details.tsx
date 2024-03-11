import { DetailsHTMLAttributes, HTMLAttributes, useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import Transition from '../Transition';

type TDetailsProps = DetailsHTMLAttributes<HTMLDetailsElement> & {
  summaryNode?: React.ReactNode;
  contentNode?: React.ReactNode;
  animationOptions?: {
    duration?: number;
    timingFunction?: string;
  };
  disabled?: boolean;
  closeOnOutsideClick?: boolean;
  unmountContentOnClose?: boolean;
  summaryProps?: HTMLAttributes<HTMLElement>;
  contentProps?: HTMLAttributes<HTMLDivElement>;
};
function Details({
  children,
  animationOptions = {},
  summaryNode,
  contentNode,
  disabled = false,
  closeOnOutsideClick = false,
  unmountContentOnClose = true,
  summaryProps = {},
  contentProps = {},
  ...props
}: TDetailsProps): JSX.Element {
  const { duration = 300, timingFunction = 'ease-out' } = animationOptions;
  const summaryRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = useOutsideClick<HTMLDetailsElement>(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, !closeOnOutsideClick);

  function onSummaryClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    summaryProps.onClick?.(e);
    e.preventDefault(); // отменить поведение по умолчанию
    if (disabled) return;

    setIsOpen((prev) => !prev);
  }

  function setHeightInit() {
    const detailsEl = detailsRef.current;
    if (!detailsEl) return;

    detailsEl.style.transition = `height ${duration}ms ${timingFunction}`;
    detailsEl.style.overflow = 'hidden'; // скрыть переполнение

    detailsEl.style.height = `${detailsEl.offsetHeight}px`; // высота закрытого состояния;
  }

  function setHeightExpanded() {
    const detailsEl = detailsRef.current;
    const summaryEl = summaryRef.current;
    const contentEl = contentRef.current;
    if (!detailsEl || !summaryEl || !contentEl) return;

    detailsEl.style.height = `${
      summaryEl.offsetHeight + contentEl.offsetHeight
    }px`;
  }
  function setHeightClosed() {
    const detailsEl = detailsRef.current;
    const summaryEl = summaryRef.current;
    if (!detailsEl || !summaryEl) return;

    detailsEl.style.height = `${summaryEl.offsetHeight}px`;
  }

  function resetHeight() {
    const detailsEl = detailsRef.current;
    if (!detailsEl) return;
    detailsEl.style.overflow = '';
    detailsEl.style.height = '';
    detailsEl.style.transition = '';
    if (!detailsEl.style.length) {
      detailsEl.removeAttribute('style');
    }
  }

  return (
    <Transition
      enter={isOpen}
      timeout={duration}
      unmountOnExit={false}
      onEnter={setHeightInit}
      onEntering={setHeightExpanded}
      onEntered={resetHeight}
      onExit={setHeightInit}
      onExiting={setHeightClosed}
      onExited={resetHeight}
    >
      {(state) => (
        <details ref={detailsRef} {...props} open={state !== 'exited'}>
          <summary {...summaryProps} ref={summaryRef} onClick={onSummaryClick}>
            {summaryNode}
          </summary>
          {(state !== 'exited' || isOpen || !unmountContentOnClose) && (
            <div {...contentProps} ref={contentRef}>
              {contentNode}
            </div>
          )}
        </details>
      )}
    </Transition>
  );
}

export default Details;
