import { SubMenuSection } from './SubMenuSection';
import { SubMenuImgLink } from './SubMenuImgLink';
import { IMenuData } from '../../../types';
import './Submenu.scss';

export interface ISubmenuProps {
  sections: Required<IMenuData>['submenu']['sections'];
  imgLinkData?: Required<IMenuData>['submenu']['imgLinkData'];
  isUsingContainer?: boolean;
  mode?: 'desktop' | 'mobile';
  isRenderImgLink?: boolean;
  close?: () => void;
}
function Submenu({
  sections,
  imgLinkData,
  mode = 'desktop',
  isUsingContainer = true,
  isRenderImgLink = true,
  close,
}: ISubmenuProps): JSX.Element {
  const bemBlockName = mode === 'desktop' ? 'submenu' : 'burger-submenu';
  const content = (
    <>
      {sections.map((section) => (
        <SubMenuSection
          key={section.title}
          section={section}
          mode={mode}
          onClickLink={close}
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
