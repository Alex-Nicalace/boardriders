import Invitation from './Invitation/Invitation';
import './JoinAndSubscrube.scss';
import iconLogo from './../../assets/icons/logo-2.png';
import { EmailIcon, EnterIcon } from '../ui/Icons';
import imgBgJoin from './../../assets/img/join-and-subscrube/join.jpg';
import imgBgsubScribe from './../../assets/img/join-and-subscrube/subscribe.jpg';
import Button from '../ui/Button';
import InputStyled from '../ui/InputStyled';
import useMatchMedia from '../../hooks/useMatchMedia';

const MEDIAQUERY = ['(max-width: 479px)'];

type TJoinAndSubscrubeProps = { className?: string };
function JoinAndSubscrube({
  className = '',
}: TJoinAndSubscrubeProps): JSX.Element {
  const [isSmall] = useMatchMedia(MEDIAQUERY);
  return (
    <div className={`${className} join-and-subscrube`}>
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
          iconElement={!isSmall && <EmailIcon />}
          imgBg={imgBgsubScribe}
          text="За подписку на наши новости"
          actionElement={
            <>
              {!isSmall ? (
                <InputStyled
                  varint="second"
                  placeholder="E-mail"
                  type="email"
                  adornmentContent={
                    <EmailIcon style={{ width: 'auto', height: '16px' }} />
                  }
                  buttonContent={
                    <EnterIcon style={{ width: 'auto', height: '19px' }} />
                  }
                />
              ) : (
                <InputStyled
                  varint="main"
                  placeholder="E-mail"
                  type="email"
                  buttonContent={
                    <EmailIcon style={{ width: 'auto', height: '11px' }} />
                  }
                />
              )}
            </>
          }
        />
      </div>
    </div>
  );
}

export default JoinAndSubscrube;
