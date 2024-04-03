import './ColorLabel.scss';
type TColorLabelProps = { label: string; color: string; className?: string };
function ColorLabel({
  label,
  color,
  className = '',
}: TColorLabelProps): JSX.Element {
  return (
    <span className={`color-label ${className}`}>
      <span
        className={`color-label__color ${
          color === '#fff' ? 'color-label__color_white' : ''
        }`}
        style={{ background: color }}
      ></span>
      <span className="color-label__label">{label}</span>
    </span>
  );
}

export default ColorLabel;
