import { SelectIcon } from '../Icons';
import './PaginationInput.scss';

type TPaginationInputProps = {
  className?: string;
  hideSizeBox?: boolean;
  totalItems: number;
  itemsPerPage: number;
  onPerPageChange?: (count: number) => void;
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
};
function PaginationInput({
  className,
  hideSizeBox = false,
  totalItems,
  itemsPerPage,
  onPerPageChange = () => {},
  currentPage,
  totalPages,
  onPageChange = () => {},
}: TPaginationInputProps): JSX.Element {
  function handlerPerPageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(
      e.target.value.replace(/\D|^0+(?=\d+)/g, '').slice(-2)
    );
    onPerPageChange(value);
  }

  function handlerPageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const prevValue = Number(e.target.value.replace(/\D|^0+(?=\d+)/g, ''));
    const value =
      prevValue > totalPages ? totalPages : prevValue < 1 ? 1 : prevValue;
    onPageChange(value);
  }

  return (
    <div className={['pagination-input', className].filter(Boolean).join(' ')}>
      {!hideSizeBox && (
        <div className="pagination-input__size-box">
          <span className="pagination-input__text">Показать</span>
          <div className="pagination-input__input-box">
            <input
              className="pagination-input__input"
              inputMode="numeric"
              value={itemsPerPage}
              onChange={handlerPerPageChange}
            />
            <span className="pagination-input__text">из {totalItems}</span>
          </div>
        </div>
      )}

      <div className="pagination-input__page-box">
        <span className="pagination-input__text">Страница</span>
        <div className="pagination-input__page">
          <button
            className="pagination-input__btn pagination-input__btn_prev"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <SelectIcon />
          </button>
          <div className="pagination-input__input-box">
            <input
              className="pagination-input__input"
              inputMode="numeric"
              value={currentPage}
              onChange={handlerPageChange}
            />
            <span className="pagination-input__text">из {totalPages}</span>
          </div>
          <button
            className="pagination-input__btn pagination-input__btn_next"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <SelectIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaginationInput;
