import './Notification.scss';
import { AlertIcon } from '../ui/Icons';

type TNotificationProps = {
  className?: string;
  text: string;
};
function Notification({ className, text }: TNotificationProps): JSX.Element {
  return (
    <div className={['notification', className].filter(Boolean).join(' ')}>
      <div className="notification__icon">
        <AlertIcon />
      </div>
      <div className="notification__text">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Notification;
