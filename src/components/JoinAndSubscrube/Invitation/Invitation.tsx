import './Invitation.scss';

// import Button from '../../ui/Button';

type TInvitationProps = {
  className?: string;
  header: string;
  iconElement: JSX.Element;
  text: string;
  imgBg: string;
  actionElement: JSX.Element;
};
function Invitation({
  className = '',
  header,
  iconElement,
  text,
  imgBg,
  actionElement,
}: TInvitationProps): JSX.Element {
  return (
    <article className={`invitation ${className}`}>
      <h2 className="invitation__header">{header}</h2>
      <div className="invitation__img">{iconElement}</div>
      <p className="invitation__text">{text}</p>
      <div className="invitation__element">{actionElement}</div>
      <div className="invitation__bg">
        <img src={imgBg} alt="Фоновая картинка" />
      </div>
    </article>
  );
}

export default Invitation;
