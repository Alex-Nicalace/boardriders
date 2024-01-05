import { Link } from 'react-router-dom';
import { ISubmenuProps } from './Submenu';

type TSubMenuImgLinkProps = {
  imgLinkData: Required<ISubmenuProps>['imgLinkData'];
  bemBlockName?: string;
};
export function SubMenuImgLink({
  imgLinkData,
  bemBlockName = 'submenu',
}: TSubMenuImgLinkProps): JSX.Element {
  const { to, title, src } = imgLinkData;
  return (
    <Link to={to} className={`${bemBlockName}__action`}>
      <figure className={`${bemBlockName}__figure`}>
        <img
          src={src}
          alt="Изображение ботбара"
          className={`${bemBlockName}__img`}
        />
        <figcaption className={`${bemBlockName}__figcaption`}>
          {title}
        </figcaption>
      </figure>
    </Link>
  );
}
