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
  className?: string;
  close?: () => void;
  onClickOutside?: (e: MouseEvent) => void;
};
function Popup({
  children,
  open = false,
  close = () => {},
  onClickOutside = () => {
    close();
  },
  className = '',
}: PopupProps): JSX.Element {
  return (
    <Transition enter={open} timeout={600}>
      {(state) =>
        createPortal(
          <PopupContent
            className={`popup ${TRANSITION_STYLES[state]} ${className}`}
            open={state !== 'exited' || open}
            onClickOutside={onClickOutside}
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
  onClickOutside = () => {},
}: PopupProps): JSX.Element {
  useLockDocumentScroll();
  const contentRef = useOutsideClick<HTMLDivElement>(onClickOutside);

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
