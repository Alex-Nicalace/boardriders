import { FourEyesIcon, MessageIcon } from '../ui/Icons';
import './StatusMessage.scss';
import {
  IStatusMessageStyles,
  TStatusMessageProps,
} from './StatusMessage.types';

function StatusMessage({
  className,
  messageBubble,
  description,
  color,
  messageFontSize,
  descriptionFontSize,
  isUseFairing,
}: TStatusMessageProps): JSX.Element {
  const style: IStatusMessageStyles = {
    ...(messageFontSize && {
      '--status-message__message-font-size': messageFontSize,
    }),
    ...(descriptionFontSize && {
      '--status-message__description-font-size': descriptionFontSize,
    }),
  };

  return (
    <div
      className={[
        'status-message',
        color && `status-message_${color}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      <div className="status-message__box">
        <div className="status-message__emoji">
          <div className="status-message__body">
            <FourEyesIcon className="status-message__icon" />
          </div>
          {messageBubble && (
            <div className="status-message__box-bubble">
              <div className="status-message__bubble">
                {isUseFairing && (
                  <>
                    <span className="status-message__fairing"></span>
                    <span className="status-message__fairing"></span>{' '}
                  </>
                )}
                <p className="status-message__message">{messageBubble}</p>
                <MessageIcon className="status-message__icon-message" />
              </div>
            </div>
          )}
        </div>
        {description && (
          <p className="status-message__description">{description}</p>
        )}
      </div>
    </div>
  );
}

export default StatusMessage;
