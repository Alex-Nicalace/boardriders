import { DetailedHTMLProps, HTMLAttributes } from 'react';
import './Spinner.scss';

type TSpinnerProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};
function Spinner({ className, ...props }: TSpinnerProps): JSX.Element {
  return (
    <div
      {...props}
      className={['spinner', className].filter(Boolean).join(' ')}
    ></div>
  );
}

export default Spinner;
