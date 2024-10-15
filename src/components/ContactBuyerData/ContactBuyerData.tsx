import './ContactBuyerData.scss';
type TContactBuyerDataProps = {
  name: string;
  phone: string;
  email: string;
  comment?: string;
};
function ContactBuyerData({
  name,
  phone,
  email,
  comment,
}: TContactBuyerDataProps): JSX.Element {
  return (
    <div className="contact-buyer-data">
      <p className="contact-buyer-data__name">{name}</p>
      <p className="contact-buyer-data__phone">{phone}</p>
      <p className="contact-buyer-data__email">{email}</p>
      {comment && (
        <p className="contact-buyer-data__comment">
          <span className="contact-buyer-data__comment-title">
            Комментарий к заказу
          </span>
          <span className="contact-buyer-data__comment-text">{comment}</span>
        </p>
      )}
    </div>
  );
}

export default ContactBuyerData;
