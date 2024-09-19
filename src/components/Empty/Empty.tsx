import StatusMessage from '../StatusMessage';
import './Empty.scss';

type TEmptyProps = {
  className?: string;
} & (
  | {
      resource: string;
      description?: never;
    }
  | {
      resource?: never;
      description: string;
    }
);
function Empty({ className, resource, description }: TEmptyProps): JSX.Element {
  return (
    <StatusMessage
      className={className}
      messageBubble="Пусто"
      messageFontSize="clamp(0.87rem, 0.53rem + 1.68vw, 2rem)"
      description={resource ? `Не удалось найти — "${resource}"` : description}
    />
  );
}

export default Empty;
