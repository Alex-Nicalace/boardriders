import ListLinks from '../../../component-library/ListLinks';
import { ISubmenuProps } from './Submenu';
import ButtonMenu from '../../ui/ButtonMenu';

type TSubMenuSectionProps = {
  section: ISubmenuProps['sections'][number];
  mode?: 'desktop' | 'mobile';
};
export function SubMenuSection({
  section,
  mode = 'desktop',
}: TSubMenuSectionProps): JSX.Element {
  const { title, isWideSection, links } = section;
  const bemBlockName = mode === 'desktop' ? 'submenu' : 'burger-submenu';

  return (
    <div
      className={`${bemBlockName}__section${
        isWideSection ? ` ${bemBlockName}__section_wide` : ''
      }`}
    >
      <h2 className={`${bemBlockName}__title`}>{title}</h2>
      {mode === 'desktop' && (
        <ListLinks
          linksData={links}
          linkAs="Link"
          listProps={{ className: `${bemBlockName}__list` }}
          itemProps={{ className: `${bemBlockName}__item` }}
          linkProps={{
            className: `${bemBlockName}__link`,
          }}
          getClassNameLink={(value) => {
            return value.isAccented ? `${bemBlockName}__link_red` : '';
          }}
        />
      )}
      {mode === 'mobile' && (
        <ListLinks
          linksData={links}
          listProps={{ className: `${bemBlockName}__list` }}
          itemProps={{ className: `${bemBlockName}__item` }}
          renderToItem={(value) => (
            <ButtonMenu
              className={`${
                value.isAccented ? `${bemBlockName}__link_red` : ''
              }`}
              to={value.to}
            >
              {value.title}
            </ButtonMenu>
          )}
        />
      )}
    </div>
  );
}
