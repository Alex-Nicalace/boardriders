import Menu from './Menu';
import { ISubmenuProps } from './Submenu';

type TSubMenuSectionProps = {
  section: ISubmenuProps['sections'][number];
};
export function SubMenuSection({ section }: TSubMenuSectionProps): JSX.Element {
  const { title, isWideSection, links } = section;
  return (
    <div
      className={`submenu__section${
        isWideSection ? ' submenu__section_wide' : ''
      }`}
    >
      <h2 className="submenu__title">{title}</h2>
      <Menu
        classNameList="submenu__list"
        classNameItem="submenu__item"
        classNameLink="submenu__link"
        items={links}
      />
    </div>
  );
}
