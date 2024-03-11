import { useEffect, useState } from 'react';
import { usePrevious } from '../../hooks/usePrevious';

export type TTransition = 'entering' | 'entered' | 'exiting' | 'exited';

function initState(toggler: boolean, appear: boolean): TTransition {
  return toggler
    ? appear
      ? 'exited'
      : 'entered'
    : appear
    ? 'entered'
    : 'exited';
}

type TTransitionProps = {
  children: JSX.Element | ((state: TTransition) => JSX.Element);
  enter: boolean;
  timeout: number;
  appear?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  onEnter?: (isAppearing?: boolean) => void;
  onEntering?: (isAppearing?: boolean) => void;
  onEntered?: (isAppearing?: boolean) => void;
  onExit?: () => void;
  onExiting?: () => void;
  onExited?: () => void;
};
/**
 * Генерирует эффект перехода для указанных дочерних элементов на основе состояния и указанного времени ожидания.
 *
 * @param {TTransitionProps} props
 * @param {boolean} [props.enter] - Флаг указывающий на вход или выход из перехода
 * @param {React.ReactNode} [props.children] - Дочерний элемент, к которому применяется эффект перехода
 * @param {number} [props.timeout] - Длительность эффекта перехода
 * @param {boolean} [props.appear] - Флаг указывающий на появление перехода
 * @param {boolean} [props.mountOnEnter=false] - Флаг указывающий на монтирование компонента только при входе "entered"
 * @param {boolean} [props.unmountOnExit=true] - Флаг указывающий на размонтирование компонента при выходе
 * @param {function} [props.onEnter] - Функция, вызываемая до применения статуса "entering"
 * @param {function} [props.onEntering] - Функция, вызываемая после применения статуса "entering"
 * @param {function} [props.onEntered] - Функция, вызываемая после применения статуса "entered"
 * @param {function} [props.onExit] - Функция, вызываемая до применения статуса "exiting"
 * @param {function} [props.onExiting] - Функция, вызываемая после применения статуса "exiting"
 * @param {function} [props.onExited] - Функция, вызываемая после применения статуса "exited"
 * @return {React.ReactNode} Дочерние элементы с примененным переходом на основе состояния и времени ожидания
 */
function Transition({
  enter,
  children,
  timeout,
  appear = false,
  mountOnEnter = false,
  unmountOnExit = true,
  onEnter = () => {},
  onEntering = () => {},
  onEntered = () => {},
  onExit = () => {},
  onExiting = () => {},
  onExited = () => {},
}: TTransitionProps): React.ReactNode {
  const [state, setState] = useState<TTransition>(() =>
    initState(enter, appear)
  );
  const prevState = usePrevious(state);

  useEffect(
    function onEnterOrExit() {
      if ((enter && state === 'entered') || (!enter && state === 'exited'))
        return;

      if (enter) {
        onEnter(appear);
        setState('entering');
      } else {
        onExit();
        setState('exiting');
      }

      const timer = setTimeout(() => {
        setState(enter ? 'entered' : 'exited');
      }, timeout);

      return () => clearTimeout(timer);
    },
    [enter, timeout, state, appear, onEnter, onExit]
  );

  useEffect(
    function onCangeState() {
      if (prevState === state) return;

      if (state === 'entering') onEntering(appear);
      if (state === 'exiting') onExiting();
      if (state === 'entered') onEntered(appear);
      if (state === 'exited') onExited();
    },
    [state, prevState, onEntering, onExiting, onEntered, onExited, appear]
  );

  const child = typeof children === 'function' ? children(state) : children;

  const isUnmount =
    (state === 'exited' && !enter && unmountOnExit) ||
    (state === 'exited' && enter && mountOnEnter);

  return isUnmount ? null : child;
}

export default Transition;
