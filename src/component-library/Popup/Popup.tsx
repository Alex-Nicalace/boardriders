import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import './Popup.scss';
import Transition, { TTransition } from '../Transition';
import { useLockDocumentScroll } from '../../hooks/useLockDocumentScroll';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const TRANSITION_STYLES: Record<TTransition, string> = {
  entering: 'popup_opened',
  entered: 'popup_opened',
  exiting: '',
  exited: '',
};

// контекст для попап
const PopupContext = createContext<{
  openName: string;
  open: (name: string) => void;
  toggle: (name: string) => void;
  close: () => void;
}>({
  openName: '',
  open: () => {},
  toggle: () => {},
  close: () => {},
});

// родительский компонент попап с контекстом
function Popup({ children }: { children: React.ReactNode }): JSX.Element {
  const [openName, setOpenName] = useState('');

  const close = useCallback(() => setOpenName(''), []);
  const open = useCallback((name: string) => setOpenName(name), []);
  const toggle = useCallback(
    (name: string) => setOpenName((prev) => (prev === name ? '' : name)),
    []
  );
  const value = useMemo(
    () => ({ openName, open, close, toggle }),
    [openName, open, close, toggle]
  );

  return (
    <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
  );
}

type TOpenProps = {
  render: (params: { open: () => void; toggle: () => void }) => JSX.Element;
  windowName: string;
};
// компонент для открытия попап
function Open({ render, windowName }: TOpenProps): JSX.Element {
  const { open, toggle } = useContext(PopupContext);
  const openWindow = useCallback(() => open(windowName), [open, windowName]);
  const toggleWindow = useCallback(
    () => toggle(windowName),
    [toggle, windowName]
  );
  const params = useMemo(
    () => ({ open: openWindow, toggle: toggleWindow }),
    [openWindow, toggleWindow]
  );

  return <>{render(params)}</>;
}

type WitdowProps = {
  windowName: string;
  render: (close: () => void) => JSX.Element;
  className?: string;
  onClickOutside?: (close: () => void, e: MouseEvent) => void;
};
function Window({
  windowName,
  render,
  className = '',
  onClickOutside = () => {},
}: WitdowProps): JSX.Element {
  const { close, openName } = useContext(PopupContext);
  const isOpen = openName === windowName;

  return (
    <Transition enter={isOpen} timeout={600}>
      {(state) =>
        createPortal(
          <WindowBody
            className={`popup ${TRANSITION_STYLES[state]} ${className}`}
            open={state !== 'exited' || isOpen}
            onClickOutside={onClickOutside}
          >
            {render(close)}
          </WindowBody>,
          document.body
        )
      }
    </Transition>
  );
}

type WindowBodyProps = {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  onClickOutside?: (close: () => void, e: MouseEvent) => void;
};
/**
 * Компонент содержит непосредственно HTML попап. Можно было бы это сделать
 * непосредственно в компоненте Window, но тогда прослушиватель события клика вне
 * области попапа всегда висел на документе (useOutsideClick)
 */
function WindowBody({
  children,
  className = '',
  open = false,
  onClickOutside = () => {},
}: WindowBodyProps): JSX.Element {
  const { close } = useContext(PopupContext);
  useLockDocumentScroll();
  const contentRef = useOutsideClick<HTMLDivElement>((e) =>
    onClickOutside(close, e)
  );

  return createPortal(
    <dialog className={className} open={open}>
      <div ref={contentRef} className="popup__content">
        {children}
      </div>
    </dialog>,
    document.body
  );
}

Popup.Open = Open;
Popup.Window = Window;

export default Popup;
