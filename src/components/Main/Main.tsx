import { HTMLAttributes } from 'react';

type TMainProps = HTMLAttributes<HTMLElement>;
function Main({ children, ...props }: TMainProps): JSX.Element {
  const className = props.className ? `main ${props.className}` : 'main';
  return (
    <main {...props} className={className}>
      {children}
    </main>
  );
}

export default Main;
