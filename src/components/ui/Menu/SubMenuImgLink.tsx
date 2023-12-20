import { Link } from 'react-router-dom';
import { ISubmenuProps } from './Submenu';

type TSubMenuImgLinkProps = {
  imgLinkData: Required<ISubmenuProps>['imgLinkData'];
};
export function SubMenuImgLink({
  imgLinkData,
}: TSubMenuImgLinkProps): JSX.Element {
  const { to, title, src } = imgLinkData;
  return (
    <Link to={to} className="submenu__action">
      <figure className="submenu__figure">
        <img src={src} alt="Изображение ботбара" className="submenu__img" />
        <figcaption className="submenu__figcaption">{title}</figcaption>
      </figure>
    </Link>
  );
}
