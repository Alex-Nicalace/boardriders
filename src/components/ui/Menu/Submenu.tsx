import { SubMenuSection } from './SubMenuSection';
import { SubMenuImgLink } from './SubMenuImgLink';

export interface ISubmenuProps {
  sections: {
    title: string;
    isWideSection?: boolean;
    links: {
      to: string;
      title: string;
      classNameItem?: string;
      classNameLink?: string;
    }[];
  }[];
  imgLinkData?: {
    src: string;
    to: string;
    title?: string;
  };
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
