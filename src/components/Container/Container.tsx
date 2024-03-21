import { HTMLAttributes } from 'react';

import './Container.scss';

type TContainerProps = HTMLAttributes<HTMLElement> & {};
function Container({
  children,
  className = '',
  ...props
}: TContainerProps): JSX.Element {
  const containerClass = `${className} container`;
  return (
    <div {...props} className={containerClass}>
      {children}
    </div>
  );
}

export default Container;
