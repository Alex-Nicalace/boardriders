import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import './ErrorMessage.scss';
import StatusMessage from '../StatusMessage';
import Button from '../ui/Button';
import { TErrorMessageProps } from './ErrorMessage.types';

function ErrorMessage({
  className,
  isGoBack,
  message: messageProp,
  isHeightScreen,
}: TErrorMessageProps): JSX.Element {
  const error = useRouteError(); // хук возвращает все, что было создано во время действия, загрузчика или рендеринга.
  console.error(error);
  const message = isRouteErrorResponse(error)
    ? error.status === 404
      ? 'Страница не найдена'
      : error.statusText
    : error instanceof Error
    ? error.message
    : 'Unknown error';

  return (
    <div
      className={[
        'error-message',
        isHeightScreen && 'error-message_height-screen',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <StatusMessage
        className="error-message__status"
        color="red"
        messageFontSize="clamp( 0.62rem , 0.30rem  +  1.58vw , 1.68rem )" //27px - 10px
        messageBubble="Ошибка!"
        description={[messageProp, message].filter(Boolean).join('. ')}
      />
      {isGoBack && (
        <Button className="error-message__btn" navigateDelta={-1}>
          &larr; Назад
        </Button>
      )}
    </div>
  );
}

export default ErrorMessage;
