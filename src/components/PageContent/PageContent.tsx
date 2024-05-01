import { ReactNode } from 'react';
import './PageContent.scss';
type TPageContentProps = {
  className?: string;
  children?: ReactNode;
  as?: 'main' | 'div';
};
function PageContent({
  children,
  as = 'div',
  className = '',
}: TPageContentProps): JSX.Element {
  const classes = `page-content ${className}`;

  return (
    <>
      {as === 'main' && <main className={classes}>{children}</main>}
      {as === 'div' && <div className={classes}>{children}</div>}
    </>
  );
}

export default PageContent;
