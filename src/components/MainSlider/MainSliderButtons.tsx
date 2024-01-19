import ButtonSlider from '../ui/ButtonSlider';

export function MainSliderButtons() {
  return (
    <>
      <ButtonSlider
        direction="left"
        className="main-slider__button main-slider__button_prev"
      />
      <ButtonSlider
        direction="right"
        className="main-slider__button main-slider__button_next"
      />
    </>
  );
}
