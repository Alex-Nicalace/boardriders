import { ReactNode } from 'react';
import './PageContent.scss';
type TPageContentProps = {
  className?: string;
  children?: ReactNode;
  as?: 'main' | 'div';
  paddingTop?: '50-15';
};
function PageContent({
  children,
  as = 'div',
  className = '',
  paddingTop,
}: TPageContentProps): JSX.Element {
  const classes = [
    'page-content',
    className,
    paddingTop && `page-content_pt-${paddingTop}`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {as === 'main' && <main className={classes}>{children}</main>}
      {as === 'div' && <div className={classes}>{children}</div>}
    </>
  );
}

export default PageContent;
