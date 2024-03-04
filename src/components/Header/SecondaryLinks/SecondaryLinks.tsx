import ListLinks from '../../../component-library/ListLinks';
import './SecondaryLinks.scss';

const LINKS_DATA = [
  {
    title: 'Магазины',
    to: '#',
  },
  {
    title: 'Помощь',
    to: '#',
  },
  {
    title: 'Блоги',
    to: '#',
  },
];

interface ISecondaryLinksProps {
  className?: string;
}

function SecondaryLinks({ className = '' }: ISecondaryLinksProps): JSX.Element {
  return (
    <ListLinks
      linksData={LINKS_DATA}
      listProps={{ className: `${className} second-links` }}
      itemProps={{ className: 'second-links__item' }}
      linkProps={{ className: 'second-links__link' }}
      linkAs="Link"
    />
  );
}

export default SecondaryLinks;
