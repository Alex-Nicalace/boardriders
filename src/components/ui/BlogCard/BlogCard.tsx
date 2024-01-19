import { Link } from 'react-router-dom';
import './BlogCard.scss';
import Picture, { IPictureProps } from '../../Picture';

interface IBlogCardProps {
  title: string;
  contentElement: React.ReactNode;
  readMorePath: string;
  allBlogsPath: string;
  image: IPictureProps;
}
function BlogCard({
  title,
  contentElement,
  readMorePath,
  allBlogsPath,
  image,
}: IBlogCardProps): JSX.Element {
  return (
    <article className="blog-card">
      <div className="blog-card__wrap">
        <h3 className="blog-card__title">{title}</h3>
        <span className="blog-card__label">Блоги</span>
        <div className="blog-card__all-blogs">
          <Link to={allBlogsPath} className="blog-card__link ">
            Все блоги
          </Link>
        </div>
        <div className="blog-card__content">{contentElement}</div>
        <div className="blog-card__read-more">
          <Link
            className="blog-card__link blog-card__link_dekor"
            to={readMorePath}
          >
            Читать продолжение
          </Link>
        </div>
      </div>
      <div className="blog-card__media">
        <Picture sources={image.sources} img={image.img} />
      </div>
    </article>
  );
}

export default BlogCard;
