import Title from '../../ui/Title';
import './Invitation.scss';

// import Button from '../../ui/Button';

type TInvitationProps = {
  className?: string;
  header: string;
  iconElement?: React.ReactNode;
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
      <Title
        className="invitation__header"
        as="h2"
        kind="h1-32-h2-21"
        color="white"
      >
        {header}
      </Title>
      {Boolean(iconElement) && (
        <div className="invitation__img">{iconElement}</div>
      )}
      <p className="invitation__text">{text}</p>
      <div className="invitation__element">{actionElement}</div>
      <div className="invitation__bg">
        <img src={imgBg} alt="Фоновая картинка" />
      </div>
    </article>
  );
}

export default Invitation;
