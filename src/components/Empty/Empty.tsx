import './Empty.scss';

type TEmptyProps = {
  className?: string;
  resource: string;
};
function Empty({ className, resource }: TEmptyProps): JSX.Element {
  return (
    <p className={['empty', className].filter(Boolean).join(' ')}>
      Не удалось найти <span className="empty__resource">{resource}</span>.
    </p>
  );
}

export default Empty;
