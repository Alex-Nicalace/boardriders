import './TabsBlock.scss';
import Tabs from '../../component-library/Tabs';
import { useScreenWidth } from '../../Context/useScreenWidthContext';

type TTabsBlockProps = Pick<
  React.ComponentProps<typeof Tabs>,
  'className' | 'value' | 'onChange' | 'children'
> & {
  variant?: 'main' | 'second';
};
function TabsBlock({
  className,
  variant = 'main',
  ...props
}: TTabsBlockProps): JSX.Element {
  const { isLessMobile } = useScreenWidth();

  return (
    <>
      {variant === 'main' && (
        <div
          className={[
            `tabs-${variant}`,
            !isLessMobile && `tabs-${variant}__container`,
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
      )}
      {variant === 'second' && (
        <Tabs
          {...props}
          className={[`tabs-${variant}`, className].filter(Boolean).join(' ')}
        />
      )}
    </>
  );
}

TabsBlock.Tab = Tabs.Tab;

export default TabsBlock;
