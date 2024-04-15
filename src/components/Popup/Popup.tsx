import { createPortal } from 'react-dom';
import './Popup.scss';
import Transition, { TTransition } from '../../component-library/Transition';
import { useLockDocumentScroll } from '../../hooks/useLockDocumentScroll';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const TRANSITION_STYLES: Record<TTransition, string> = {
  entering: 'popup_opened',
  entered: 'popup_opened',
  exiting: '',
  exited: '',
};

type PopupProps = {
  children: React.ReactNode;
  open?: boolean;
  close?: () => void;
  className?: string;
};
function Popup({
  children,
  open = false,
  close = () => {},
  className = '',
}: PopupProps): JSX.Element {
  return (
    <Transition enter={open} timeout={600}>
      {(state) =>
        createPortal(
          <PopupContent
            className={`popup ${TRANSITION_STYLES[state]} ${className}`}
            open={state !== 'exited' || open}
            close={close}
          >
            {children}
          </PopupContent>,
          document.body
        )
      }
    </Transition>
  );
}

function PopupContent({
  children,
  className = '',
  open = false,
  close = () => {},
}: PopupProps): JSX.Element {
  useLockDocumentScroll();
  const contentRef = useOutsideClick<HTMLDivElement>((e) => {
    if (e.target instanceof HTMLElement && e.target.closest('.burger')) return;
    close();
  });

  return createPortal(
    <dialog className={className} open={open}>
      <div ref={contentRef} className="popup__content">
        {children}
      </div>
    </dialog>,
    document.body
  );
}

export default Popup;
