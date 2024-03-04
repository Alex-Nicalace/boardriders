import { isIMenuData } from '../../../data/menuData';
import ListLinks from '../../../component-library/ListLinks';
import { ISubmenuProps } from './Submenu';

type TSubMenuSectionProps = {
  section: ISubmenuProps['sections'][number];
  bemBlockName?: string;
};
export function SubMenuSection({
  section,
  bemBlockName = 'submenu',
}: TSubMenuSectionProps): JSX.Element {
  const { title, isWideSection, links } = section;
  return (
    <div
      className={`${bemBlockName}__section${
        isWideSection ? ` ${bemBlockName}__section_wide` : ''
      }`}
    >
      <h2 className={`${bemBlockName}__title`}>{title}</h2>
      <ListLinks
        linksData={links}
        linkAs="Link"
        listProps={{ className: `${bemBlockName}__list` }}
        itemProps={{ className: `${bemBlockName}__item` }}
        linkProps={{
          className: `${bemBlockName}__link`,
        }}
        getClassNameLink={(value) => {
          if (!isIMenuData(value)) return '';
          return value.isAccented ? `${bemBlockName}__link_red` : '';
        }}
      />
    </div>
  );
}
