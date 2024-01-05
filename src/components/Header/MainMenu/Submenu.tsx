import { SubMenuSection } from './SubMenuSection';
import { SubMenuImgLink } from './SubMenuImgLink';
import { IMenuData } from '../../../data/menuData';
import './Submenu.scss';

export interface ISubmenuProps {
  sections: Required<IMenuData>['submenu']['sections'];
  imgLinkData?: Required<IMenuData>['submenu']['imgLinkData'];
  isUsingContainer?: boolean;
  bemBlockName?: string;
  isRenderImgLink?: boolean;
}
function Submenu({
  sections,
  imgLinkData,
  bemBlockName = 'submenu',
  isUsingContainer = true,
  isRenderImgLink = true,
}: ISubmenuProps): JSX.Element {
  const content = (
    <>
      {sections.map((section) => (
        <SubMenuSection
          key={section.title}
          section={section}
          bemBlockName={bemBlockName}
        />
      ))}
      {imgLinkData && isRenderImgLink && (
        <SubMenuImgLink imgLinkData={imgLinkData} bemBlockName={bemBlockName} />
      )}
    </>
  );
  return (
    <div className={bemBlockName}>
      {isUsingContainer ? (
        <div className={`${bemBlockName}__container`}>{content}</div>
      ) : (
        content
      )}
    </div>
  );
}

export default Submenu;
