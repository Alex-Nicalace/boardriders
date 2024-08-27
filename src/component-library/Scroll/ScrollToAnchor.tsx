import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Компонент, который прокручивает страницу к элементу, указанному в URL по хешу.
 * При изменении хеша, или при монтировании компонента,
 * выполняет прокрутку страницы к элементу с таким же id, который был указан в URL.
 */
function ScrollToAnchor() {
  const { hash } = useLocation();

  useEffect(
    function () {
      if (!hash) return;
      const id = hash.slice(1); // убираем #
      const element = document.getElementById(id); // получаем элемент по id
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' }); // прокручиваем до элемента
    },
    [hash]
  );

  return null;
}

export default ScrollToAnchor;
