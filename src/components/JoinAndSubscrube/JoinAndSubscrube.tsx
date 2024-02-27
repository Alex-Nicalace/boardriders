import Invitation from './Invitation/Invitation';
import './JoinAndSubscrube.scss';
import iconLogo from './../../assets/icons/logo-2.png';
// import icon from './../../assets/icons/logo-2.png';
import { EmailIcon } from '../ui/Icons';
import imgBgJoin from './../../assets/img/join-and-subscrube/join.jpg';
import imgBgsubScribe from './../../assets/img/join-and-subscrube/subscribe.jpg';
import Button from '../ui/Button';

// type TJoinAndSubscrubeProps = {};
function JoinAndSubscrube(): JSX.Element {
  return (
    <div className="join-and-subscrube">
      <div className="join-and-subscrube__container">
        <Invitation
          className="join-and-subscrube__join"
          header="Программа лояльности"
          iconElement={<img src={iconLogo} alt="Иконка" />}
          imgBg={imgBgJoin}
          text="Зарабатывайте баллы и получайте преимущества"
          actionElement={
            <Button to="#" variant="reverse">
              Вступить в клуб
            </Button>
          }
        />
        <Invitation
          className="join-and-subscrube__subscrube"
          header="Скидка -10%"
          iconElement={<EmailIcon />}
          imgBg={imgBgsubScribe}
          text="За подписку на наши новости"
          actionElement={<Button to="#">Вступить в клуб</Button>}
        />
      </div>
    </div>
  );
}

export default JoinAndSubscrube;
