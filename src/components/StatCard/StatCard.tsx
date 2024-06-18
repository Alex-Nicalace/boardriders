import { Link } from 'react-router-dom';
import { QuestionInCircleIcon } from '../ui/Icons';
import './StatCard.scss';

type TStatCardProps = {
  children?: React.ReactNode;
  className?: string;
  title: string;
  hint?: string;
  tooltip?: string;
  labelTarget: string;
  toTarget?: string;
  onClickTarget?: () => void;
};
function StatCard({
  children,
  className,
  title,
  hint,
  tooltip,
  labelTarget,
  toTarget,
  onClickTarget,
}: TStatCardProps): JSX.Element {
  return (
    <article className={['stat-card', className].filter(Boolean).join(' ')}>
      <header className="stat-card__header">
        <h2 className="stat-card__title">{title}</h2>
        {hint && <p className="stat-card__hint">({hint})</p>}
        {tooltip && (
          <QuestionInCircleIcon className="stat-card__question-icon" />
        )}
        <div className="stat-card__box-target">
          {toTarget ? (
            <Link className="stat-card__target" to={toTarget}>
              {labelTarget}
            </Link>
          ) : (
            <button className="stat-card__target" onClick={onClickTarget}>
              {labelTarget}
            </button>
          )}
        </div>
      </header>
      <div className="stat-card__content">{children}</div>
    </article>
  );
}

export default StatCard;
