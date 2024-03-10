import { useEffect, useState } from 'react';

type TTransition = 'entering' | 'entered' | 'exiting' | 'exited';

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
 * @return {React.ReactNode} Дочерние элементы с примененным переходом на основе состояния и времени ожидания
 */
function Transition({
  enter,
  children,
  timeout,
  appear = false,
  mountOnEnter = false,
  unmountOnExit = true,
}: TTransitionProps): React.ReactNode {
  const [state, setState] = useState<TTransition>(() =>
    initState(enter, appear)
  );

  useEffect(
    function changeState() {
      if ((enter && state === 'entered') || (!enter && state === 'exited'))
        return;

      setState(enter ? 'entering' : 'exiting');

      const timer = setTimeout(() => {
        setState(enter ? 'entered' : 'exited');
      }, timeout);

      return () => clearTimeout(timer);
    },
    [enter, timeout, state]
  );

  const child = typeof children === 'function' ? children(state) : children;

  const isUnmount =
    (state === 'exited' && !enter && unmountOnExit) ||
    (state === 'exited' && enter && mountOnEnter);

  return isUnmount ? null : child;
}

export default Transition;
