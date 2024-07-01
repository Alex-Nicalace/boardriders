import './PaginationInput.scss';

type TPaginationInputProps = {
  className?: string;
  hideSizeBox?: boolean;
};
function PaginationInput({
  className,
  hideSizeBox = false,
}: TPaginationInputProps): JSX.Element {
  return (
    <div className={['pagination-input', className].filter(Boolean).join(' ')}>
      {!hideSizeBox && (
        <div className="pagination-input__size-box">
          <span className="pagination-input__text">Показать</span>
          <div className="pagination-input__input-box">
            <input className="pagination-input__input" />
            <span className="pagination-input__text">из 23</span>
          </div>
        </div>
      )}

      <div className="pagination-input__page-box">
        <span className="pagination-input__text">Страница</span>
        <div className="pagination-input__page">
          <button className="pagination-input__btn">{'<'}</button>
          <div className="pagination-input__input-box">
            <input className="pagination-input__input" />
            <span className="pagination-input__text">из 2</span>
          </div>
          <button className="pagination-input__btn">{'>'}</button>
        </div>
      </div>
    </div>
  );
}

export default PaginationInput;
