import Notification from '../Notification';

const NotAvailable = ({ message }: { message: string }) => (
  <Notification
    className="delivery-option__notification"
    text={`Способ доставки «${message}» недоступен 🙄`}
  />
);

export default NotAvailable;
