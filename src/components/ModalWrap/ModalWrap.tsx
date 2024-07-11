import { CloseIcon } from '../ui/Icons';
import './ModalWrap.scss';

type TModalWrapProps = {
  children?: React.ReactNode;
  close: () => void;
};
function ModalWrap({ children, close }: TModalWrapProps): JSX.Element {
  return (
    <div className="modal-wrap">
      <div className="modal-wrap__content">
        {children}
        <button className="modal-wrap__close-btn" onClick={close}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

export default ModalWrap;
