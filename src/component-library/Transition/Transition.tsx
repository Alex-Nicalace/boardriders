import { useEffect, useState } from 'react';
import { usePrevious } from '../../hooks/usePrevious';
import { TStateTransition, TTransitionProps } from './Transition.types';

function initState(appear: boolean, toggler?: boolean): TStateTransition {
  return toggler
    ? appear
      ? 'exited'
      : 'entered'
    : appear
    ? 'entered'
    : 'exited';
}

/**
 * Генерирует эффект перехода для указанных дочерних элементов на основе состояния и указанного времени ожидания.
 *
 * @param props - Свойства
 * @param [props.enter] - Флаг указывающий на вход или выход из перехода
 * @param [props.children] - Дочерний элемент, к которому применяется эффект перехода
 * @param [props.timeout] - Длительность эффекта перехода
 * @param [props.appear] - При 1-м монтировании выполнять переход или нет
 * @param [props.mountOnEnter=false] - Флаг указывающий на монтирование компонента только при входе "entered"
 * @param [props.unmountOnExit=true] - Флаг указывающий на размонтирование компонента при выходе
 * @param [props.onEnter] - Функция, вызываемая до применения статуса "entering"
 * @param [props.onEntering] - Функция, вызываемая после применения статуса "entering"
 * @param [props.onEntered] - Функция, вызываемая после применения статуса "entered"
 * @param [props.onExit] - Функция, вызываемая до применения статуса "exiting"
 * @param [props.onExiting] - Функция, вызываемая после применения статуса "exiting"
 * @param [props.onExited] - Функция, вызываемая после применения статуса "exited"
 * @return Дочерние элементы с примененным переходом на основе состояния и времени ожидания
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
  const [state, setState] = useState<TStateTransition>(() =>
    initState(appear, enter)
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
