export type TStateTransition = 'entering' | 'entered' | 'exiting' | 'exited';

export type TTransitionProps = {
  children: React.ReactNode | ((state: TStateTransition) => React.ReactNode);
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
