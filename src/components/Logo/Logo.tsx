import { Link } from 'react-router-dom';
import './Logo.scss';
import logo from '../../assets/icons/logo.png';

type TLogoProps = { className?: string };
function Logo({ className }: TLogoProps): JSX.Element {
  return (
    <Link to="/" className={['logo', className].filter(Boolean).join(' ')}>
      <img
        src={logo}
        alt="Логотип бренда Boardriders"
        className="logo__img"
        width={242}
        height={50}
      />
    </Link>
  );
}

export default Logo;
