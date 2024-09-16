import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import './Popup.scss';
import Transition, { TTransition } from '../Transition';
import { useLockDocumentScroll } from '../../hooks/useLockDocumentScroll';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import {
  ICustomCSSProperties,
  TOpenProps,
  TWindowBodyProps,
  TWindowProps,
} from './Popup.types';

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

/**
 * Рендерит компонент окна с указанными свойствами.
 *
 * @param {object} props - Объект props, содержащий следующие свойства:
 *   - windowName: Имя окна, если в начале есть символ #, то окно открывается при нажатии на ссылку
 *   - render: Функция рендеринга для окна
 *   - className: CSS-класс для стилизации
 *   - onClickOutside: Функция для обработки клика вне окна
 *   - fullHeight: Флаг для полной высоты окна
 *   - fullWidth: Флаг для полной ширины окна
 *   - transitionDuration: Длительность эффектов перехода
 *   - transitionEffect: Эффект, применяемый во время перехода
 *   - isModal: Флаг, указывающий, является ли окно модальным. Тег <dialog> можно открыть как попап, так и модальным
 * @return {JSX.Element} Отрисованный компонент окна
 */
function Window({
  windowName,
  render,
  className,
  onClickOutside = () => {},
  fullHeight = false,
  fullWidth = false,
  transitionDuration = 600,
  transitionEffect,
  mode = 'popup',
}: TWindowProps): JSX.Element {
  const { close, openName, open } = useContext(PopupContext);
  const location = useLocation();
  const navigate = useNavigate();
  const modalNameFromHash = location.hash.slice(1);
  const isOpenFromHash = modalNameFromHash === windowName;
  const isOpen = openName === windowName;

  useEffect(
    function openModalFromHash() {
      if (isOpenFromHash) {
        open(windowName);
      }
    },
    [isOpenFromHash, open, windowName]
  );

  function closeWindow() {
    if (isOpenFromHash) {
      navigate({
        ...location,
        hash: '',
      });
    }
    close();
  }

  return (
    <Transition enter={isOpen} timeout={transitionDuration}>
      {(state) =>
        createPortal(
          <WindowBody
            className={[
              'popup',
              `popup_mode_${mode}`,
              fullHeight && 'popup_full-height',
              fullWidth && 'popup_full-width',
              transitionEffect
                ?.map((item) => `popup_trans-effect_${item}`)
                .join(' '),
              TRANSITION_STYLES[state],
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            open={state !== 'exited' || isOpen}
            transitionDuration={transitionDuration}
            mode={mode}
            onClickOutside={onClickOutside}
            closeWindow={closeWindow}
          >
            {render(closeWindow)}
          </WindowBody>,
          document.body
        )
      }
    </Transition>
  );
}

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
  transitionDuration,
  mode,
  closeWindow,
}: TWindowBodyProps): JSX.Element {
  useLockDocumentScroll();
  const contentRef = useOutsideClick<HTMLDivElement>((e) =>
    onClickOutside(closeWindow, e)
  );
  const dialogEl = useRef<HTMLDialogElement>(null);
  const style: ICustomCSSProperties = {
    ...(transitionDuration && {
      '--popup-duration-transition': `${transitionDuration}ms`,
    }),
  };

  useEffect(
    function toggleVisibleDialog() {
      const dialog = dialogEl.current;
      if (!dialog) return;

      const showDialog = () => {
        const showDialogMethod =
          mode === 'modal' ? dialog.showModal : dialog.show;
        showDialogMethod.call(dialog); // !в отрыве от объекта ошибка
      };

      const closeDialog = () => dialog.close();

      open ? showDialog() : closeDialog();
    },
    [open, mode]
  );

  return createPortal(
    <dialog ref={dialogEl} className={className} style={style}>
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
