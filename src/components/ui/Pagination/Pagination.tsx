import { SelectIcon } from '../Icons';
import './Pagination.scss';

type TPaginationProps = {
  className?: string;
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  visiblePageNumbers?: number;
  isShowNavigationButtons?: boolean;
};
function Pagination({
  className = '',
  currentPage,
  totalPages,
  onPageChange = () => {},
  visiblePageNumbers = 5,
  isShowNavigationButtons = true,
}: TPaginationProps): JSX.Element {
  const pageNumbers = generatePageNumbers();

  function generatePageNumbers() {
    switch (true) {
      // Если всего страниц меньше или равно количеству видимых номеров, отображаем все страницы
      case totalPages <= visiblePageNumbers:
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      // Если текущая страница ближе к началу, отображаем первые visiblePageNumbers страниц
      case currentPage <= Math.ceil(visiblePageNumbers / 2):
        return Array.from({ length: visiblePageNumbers }, (_, i) => i + 1);
      // Если текущая страница ближе к концу, отображаем последние visiblePageNumbers страниц
      case currentPage >= totalPages - Math.floor(visiblePageNumbers / 2):
        return Array.from(
          { length: visiblePageNumbers },
          (_, i) => totalPages - visiblePageNumbers + i + 1
        );
      default:
    }
    // Иначе отображаем текущую страницу в центре и окружающие страницы
    const middlePage = Math.ceil(visiblePageNumbers / 2);
    return Array.from(
      { length: visiblePageNumbers },
      (_, i) => currentPage - middlePage + i + 1
    );
  }

  const ellipsisItemElement = (
    <li className="pagination__item">
      <button className="pagination__button" disabled>
        ...
      </button>
    </li>
  );

  const showFirstEllipsis = currentPage > Math.ceil(visiblePageNumbers / 2) &&
    totalPages > visiblePageNumbers && (
      <>
        <li className={`pagination__item `}>
          <button
            className="pagination__button"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
        </li>
        {ellipsisItemElement}
      </>
    );

  const showLastEllipsis = currentPage <
    totalPages - Math.floor(visiblePageNumbers / 2) &&
    totalPages > visiblePageNumbers && (
      <>
        {ellipsisItemElement}
        <li className={`pagination__item `}>
          <button
            className="pagination__button"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      </>
    );

  return (
    <nav
      className={['pagination', className].filter(Boolean).join(' ')}
      aria-label="Page navigation"
    >
      <ul className="pagination__list">
        {isShowNavigationButtons && (
          <li className="pagination__item">
            <button
              className="pagination__button pagination__button_prev"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <SelectIcon />
            </button>
          </li>
        )}
        {showFirstEllipsis}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`pagination__item ${
              number === currentPage ? 'pagination__item_active' : ''
            }`}
          >
            <button
              className="pagination__button"
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
        {showLastEllipsis}
        {isShowNavigationButtons && (
          <li className="pagination__item">
            <button
              className="pagination__button pagination__button_next"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <SelectIcon />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
