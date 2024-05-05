import './RatingCounts.scss';

interface ICustomCSSProperties extends React.CSSProperties {
  '--rating-counts-meter-hight'?: string;
  '--rating-counts-meter-color-bg'?: string;
  '--rating-counts-meter-border-radius'?: string;
  '--rating-counts-meter-color'?: string;
  '--rating-counts-row-gap'?: string;
}

type TRatingCountsProps = {
  className?: string;
  data: { rating: number; count: number }[];
  starElement?: JSX.Element;
  meter?: {
    hight?: string;
    colorBg?: string;
    borderRadius?: string;
    color?: string;
  };
  rowGap?: string;
};
function RatingCounts({
  className = '',
  data,
  starElement,
  meter = {},
  rowGap,
}: TRatingCountsProps): JSX.Element {
  const dataSorted = [...data].sort((a, b) => b.rating - a.rating);
  const totalCount = data.reduce((acc, { count }) => acc + count, 0);
  const styleRatingCounts: ICustomCSSProperties = {
    ...(meter.hight && { '--rating-counts-meter-hight': meter.hight }),
    ...(meter.colorBg && { '--rating-counts-meter-color-bg': meter.colorBg }),
    ...(meter.borderRadius && {
      '--rating-counts-meter-border-radius': meter.borderRadius,
    }),
    ...(meter.color && {
      '--rating-counts-meter-color': meter.color,
    }),
    ...(rowGap && { '--rating-counts-row-gap': rowGap }),
  };

  return (
    <div className={`rating-counts ${className}`} style={styleRatingCounts}>
      <ul className="rating-counts__list">
        {dataSorted.map(({ rating, count }) => (
          <li key={rating} className="rating-counts__item">
            <span className="rating-counts__rating">{rating}</span>
            <span className="rating-counts__star">{starElement || '★'}</span>
            <meter
              className="rating-counts__meter"
              value={count}
              min={0}
              max={totalCount}
            />
            <span className="rating-counts__count">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RatingCounts;
