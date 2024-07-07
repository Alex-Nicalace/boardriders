import { Link } from 'react-router-dom';
import './Footer.scss';
import logoIcon from '../../assets/icons/logo-white.png';
import appStoreIcon from '../../assets/icons/app-store.png';
import googlePlayIcon from '../../assets/icons/google-play.png';
import qrIcon from '../../assets/img/app_qrcode.png';
import InputStyled from '../ui/InputStyled';
import {
  EmailIcon,
  EnterIcon,
  Twitter,
  Facebook,
  Twitch,
  Youtube,
  Instagram,
  TelephoneIcon,
} from '../ui/Icons';
import ListLinks from '../../component-library/ListLinks';
import Accordion from '../../component-library/Accordion';
import { useScreenWidth } from '../../Context/useScreenWidthContext';

const SOCIALS = [
  {
    icon: <Twitter style={{ width: 'auto', height: '17px' }} />,
    to: 'https://twitter.com',
    title: 'Twitter',
  },
  {
    icon: <Facebook style={{ width: 'auto', height: '20px' }} />,
    to: 'https://facebook.com',
    title: 'Facebook',
  },
  {
    icon: <Twitch style={{ width: 'auto', height: '22px' }} />,
    to: 'https://twitch.com',
    title: 'Twitch',
  },
  {
    icon: <Youtube style={{ width: 'auto', height: '17px' }} />,
    to: 'https://youtube.com',
    title: 'Youtube',
  },
  {
    icon: <Instagram style={{ width: 'auto', height: '20px' }} />,
    to: 'https://instagram.com',
    title: 'Instagram',
  },
];

const LINKS_DATA = [
  {
    title: 'Помощь',
    links: [
      {
        title: 'Доставка',
        to: '#',
      },
      {
        title: 'Оплата',
        to: '#',
      },
      {
        title: 'Возврат',
        to: '#',
      },
      {
        title: 'Отзывы',
        to: '#',
      },
      {
        title: 'Акции и скидки',
        to: '#',
      },
    ],
  },
  {
    title: 'Компания',
    links: [
      {
        title: 'Контакты',
        to: '#',
      },
      {
        title: 'О boardriders',
        to: '#',
      },
      {
        title: 'Вакансии',
        to: '#',
      },
      {
        title: 'Публичная оферта',
        to: '#',
      },
    ],
  },
  {
    title: 'Boardriders Inc.',
    links: [
      {
        title: 'Франчайзинг',
        to: '#',
      },
      {
        title: 'Quiksilver',
        to: '#',
      },
      {
        title: 'Roxy',
        to: '#',
      },
      {
        title: 'DC Shoes',
        to: '#',
      },
      {
        title: 'Boardriders Club',
        to: '#',
      },
    ],
  },
];

const CONTACTS_DATA: {
  icon: JSX.Element;
  title: string;
  header: React.ReactNode;
  text: React.ReactNode;
}[] = [
  {
    icon: <TelephoneIcon style={{ width: 'auto', height: '23px' }} />,
    title: 'Телефон',
    header: <a href="tel:88005117468">8 (800) 511-74-68</a>,
    text: 'Бесплатная горячая линия Ежедневно с 9 до 21',
  },
  {
    icon: <EmailIcon style={{ width: 'auto', height: '20px' }} />,
    title: 'Email',
    header: 'Контактный Email',
    text: <a href="mailto:info@brd.ru">info@brd.ru</a>,
  },
];

// type TFooterProps = {};
function Footer(): JSX.Element {
  const { isLessTablet, isLessMobile } = useScreenWidth();

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__container">
          <div className="footer__top">
            {!isLessMobile && (
              <Link to="/" className="footer__logo">
                <img
                  className="footer__logo-img"
                  src={logoIcon}
                  alt="Логотип"
                />
              </Link>
            )}
            <div className="footer__subscribe">
              <InputStyled
                variant="second"
                placeholder="Подпишись на рассылку и получи -10% скидку"
                type="email"
                adornmentContent={
                  <EmailIcon style={{ width: 'auto', height: '16px' }} />
                }
                buttonContent={
                  <EnterIcon style={{ width: 'auto', height: '19px' }} />
                }
                className=" input-second_dark"
              />
            </div>
          </div>
          <div className="footer__middle">
            {isLessTablet && <SocialsLinks />}
            <div className="footer__apps">
              <p className="footer__title-apps footer__title">
                Доступ к ранним релизам в приложении
              </p>
              <div className="footer__links-apps">
                <a
                  className="footer__app-link"
                  href="https://www.apple.com/app-store/"
                >
                  <img
                    className="footer__app-store-img"
                    src={appStoreIcon}
                    alt="App Store"
                  />
                </a>
                <a
                  className="footer__app-link"
                  href="https://play.google.com/store/apps"
                >
                  <img
                    className="footer__app-store-img"
                    src={googlePlayIcon}
                    alt="Google Play"
                  />
                </a>
              </div>
              {!isLessTablet && (
                <div className="footer__qr">
                  <img className="footer__qr-img" src={qrIcon} alt="QR" />
                </div>
              )}
            </div>
            <Accordion
              className="footer__spoilers"
              closeOnOutsideClick
              isSingleOpen
              responsive={{ screenWidth: 991.98 }}
              itemSettings={{
                className: 'footer__spoiler',
                summaryProps: {
                  className: 'footer__title footer__summary',
                },
                contentProps: {
                  className: 'footer__spoiler-content',
                },
              }}
            >
              <Accordion.Item
                id="Контакты"
                summaryNode="Контакты"
                contentNode={
                  <ListLinks
                    linksData={CONTACTS_DATA}
                    listProps={{ className: 'footer__list-contacts' }}
                    itemProps={{ className: 'footer__item-contact' }}
                    renderToItem={({ icon, header, text }) => (
                      <div className="footer__contact">
                        <div className="footer__contact-icon">{icon}</div>
                        <div className="footer__contact-title">{header}</div>
                        <div className="footer__contact-text">{text}</div>
                      </div>
                    )}
                  />
                }
              />
              {LINKS_DATA.map(({ title, links }) => (
                <Accordion.Item
                  summaryNode={title}
                  key={title}
                  id={title}
                  contentNode={
                    <ListLinks
                      linksData={links}
                      linkAs="Link"
                      listProps={{ className: 'footer__list-links' }}
                      itemProps={{ className: 'footer__list-item' }}
                      linkProps={{ className: 'footer__link' }}
                    />
                  }
                />
              ))}
            </Accordion>
          </div>
          <address className="footer__bottom">
            {!isLessTablet && <SocialsLinks />}
            <p className="footer__copyright">© 2020. Все права защищены.</p>
          </address>
        </div>
      </div>
    </footer>
  );
}

function SocialsLinks() {
  return (
    <ListLinks
      linksData={SOCIALS}
      listProps={{ className: 'footer__socials' }}
      bemBlockName="socials"
      renderToItem={({ icon, to, title }) => (
        <a className="socials__link" href={to} title={title}>
          {icon}
        </a>
      )}
    />
  );
}

export default Footer;
