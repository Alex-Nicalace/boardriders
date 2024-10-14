import Rating from '../../component-library/Rating';
import { formaterDate } from '../../utils/formaters';
import { StarIcon } from '../ui/Icons';
import './Review.scss';
type TReviewProps = {
  rating?: number;
  name: string;
  message?: React.ReactNode;
  dateString: string;
};
function Review({
  rating,
  name,
  message,
  dateString,
}: TReviewProps): JSX.Element {
  return (
    <article className="review">
      <header className="review__header">
        <h2 className="review__title">{name}</h2>
        <time className="review__date" dateTime={dateString}>
          {formaterDate(new Date(dateString))}
        </time>
        <Rating
          className="review__rating"
          rating={rating}
          iconActiveElement={<StarIcon fill="#EB5757" stroke="#EB5757" />}
          iconUnactiveElement={<StarIcon fill="transparent" stroke="#bdbdbd" />}
          size="20px"
          gap="10px"
          isShowValue={false}
          disabled
        />
      </header>
      <p className="review__text">{message}</p>
    </article>
  );
}

export default Review;
