import { CloseIcon } from '../ui/Icons';
import './ModalWrap.scss';

type TModalWrapProps = {
  children?: React.ReactNode;
  close: () => void;
  withDecorFrame?: boolean;
};
function ModalWrap({
  children,
  close,
  withDecorFrame,
}: TModalWrapProps): JSX.Element {
  return (
    <div
      className={['modal-wrap', withDecorFrame && 'modal-wrap_framed']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="modal-wrap__content">
        {children}
        <button className="modal-wrap__close-btn" onClick={close}>
          <CloseIcon className="modal-wrap__close-icon" />
        </button>
      </div>
    </div>
  );
}

export default ModalWrap;
