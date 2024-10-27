import { TStateTransition } from '../component-library/Transition';

export const TRANSITION_STYLES_BACKOUTLEFT: Record<TStateTransition, string> = {
  entering: '',
  entered: '',
  exiting: 'animate backOutLeft',
  exited: '',
};

export const TRANSITION_STYLES_ZOOMOUT: Record<TStateTransition, string> = {
  // .sr-only чтобы в FavouriteList при появлении нового элемента
  // была задержка видимости перед анимацией удаления
  entering: 'sr-only',
  entered: '',
  exiting: 'animate zoomOut',
  exited: '',
};
