import { SubMenuSection } from './SubMenuSection';
import { SubMenuImgLink } from './SubMenuImgLink';
import { IMenuItemData } from './Menu';

export interface ISubmenuProps {
  sections: Required<IMenuItemData>['submenu']['sections'];
  imgLinkData?: Required<IMenuItemData>['submenu']['imgLinkData'];
}
function Submenu({ sections, imgLinkData }: ISubmenuProps): JSX.Element {
  return (
    <div className="submenu">
      <div className="submenu__container">
        {sections.map((section) => (
          <SubMenuSection key={section.title} section={section} />
        ))}
        {imgLinkData && <SubMenuImgLink imgLinkData={imgLinkData} />}
      </div>
    </div>
  );
}

export default Submenu;
