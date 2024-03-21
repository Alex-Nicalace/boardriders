import { Link } from 'react-router-dom';

import './ProductCategoryLink.scss';

type TProductCategoryLinkProps = { img: string; title: string; to: string };
function ProductCategoryLink({
  img,
  title,
  to,
}: TProductCategoryLinkProps): JSX.Element {
  return (
    <Link className="product-category-link" to={to}>
      <span className="product-category-link__img">
        <img src={img} alt={title} />
      </span>
      <span className="product-category-link__title">{title}</span>
    </Link>
  );
}

export default ProductCategoryLink;
