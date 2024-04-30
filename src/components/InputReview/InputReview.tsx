import './InputReview.scss';
import InputText from '../../component-library/InputText';
import Rating from '../../component-library/Rating';
import Button from '../ui/Button';
import { StarIcon } from '../ui/Icons';

type TInputReviewProps = {
  className?: string;
  type?: 'row' | 'column';
};
function InputReview({
  className = '',
  type = 'row',
}: TInputReviewProps): JSX.Element {
  const bemBlockName = `input-review${type === 'column' ? '-column' : ''}`;
  return (
    <InputText
      className={className}
      bemBlockName={bemBlockName}
      placeholder="Оставьте отзыв"
      endAdornment={
        <>
          <Rating
            className={`${bemBlockName}__rating`}
            iconActiveElement={<StarIcon fill="#EB5757" stroke="#EB5757" />}
            iconUnactiveElement={<StarIcon fill="transparent" stroke="#000" />}
            size="20px"
            gap="10px"
            isShowValue={false}
          />
          <Button className={`${bemBlockName}__btn`}>Отправить</Button>
        </>
      }
    />
  );
}

export default InputReview;
