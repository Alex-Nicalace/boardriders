import './TabsBlock.scss';
import Tabs from '../../component-library/Tabs';
import { useScreenWidth } from '../../Context/useScreenWidthContext';

type TTabsBlockProps = Pick<
  React.ComponentProps<typeof Tabs>,
  'className' | 'value' | 'onChange' | 'children'
>;
function TabsBlock({ className, ...props }: TTabsBlockProps): JSX.Element {
  const { isLessMobile } = useScreenWidth();

  return (
    <div
      className={[
        'tabs-block',
        !isLessMobile && 'tabs-block__container',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Tabs
        {...props}
        variant="scrollable"
        scrollButtons={!isLessMobile ? 'auto' : false}
        isDragScrollableTabs
      />
    </div>
  );
}

TabsBlock.Tab = Tabs.Tab;

export default TabsBlock;
