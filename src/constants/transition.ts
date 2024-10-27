import { TStateTransition } from '../component-library/Transition';

export const TRANSITION_STYLES_BACKOUTLEFT: Record<TStateTransition, string> = {
  entering: '',
  entered: '',
  exiting: 'animate backOutLeft',
  exited: '',
};

export const TRANSITION_STYLES_ZOOMOUT: Record<TStateTransition, string> = {
  entering: '',
  entered: '',
  exiting: 'animate zoomOut',
  exited: '',
};
