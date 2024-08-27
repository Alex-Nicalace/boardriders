import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Компонент, который при каждом изменении пути в URL прокручивает страницу вверх.
 *
 */
function ScrollToTop() {
  const { pathname } = useLocation(); // получаем текущий путь

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); // прокручиваем страницу вверх
  }, [pathname]);

  return null;
}

export default ScrollToTop;
