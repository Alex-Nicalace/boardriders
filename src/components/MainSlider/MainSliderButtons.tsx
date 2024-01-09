import { ArrowLeftIcon, ArrowRightIcon } from '../ui/Icons';

export function MainSliderButtons() {
  return (
    <>
      <button className="main-slider__button main-slider__button_prev">
        <ArrowLeftIcon />
      </button>
      <button className="main-slider__button main-slider__button_next">
        <ArrowRightIcon />
      </button>
    </>
  );
}
