import { Controller, useForm } from 'react-hook-form';
import './InputReview.scss';
import InputText from '../../component-library/InputText';
import Rating from '../../component-library/Rating';
import Button from '../ui/Button';
import { StarIcon } from '../ui/Icons';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import { TInputReviewForm, TInputReviewProps } from './InputReview.types';

function InputReview({
  className,
  type = 'row',
  onSubmit = () => {},
}: TInputReviewProps): JSX.Element {
  const { isLessTablet } = useScreenWidth();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TInputReviewForm>();
  const bemBlockName = `input-review${type === 'column' ? '-column' : ''}`;

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <InputText
        bemBlockName={bemBlockName}
        placeholder="Оставьте отзыв"
        endAdornment={
          <>
            <Controller
              name="rating"
              control={control}
              rules={{ required: 'Укажите оценку' }}
              render={({ field: { value, onChange } }) => (
                <Rating
                  rating={value}
                  onChangeRating={onChange}
                  className={`${bemBlockName}__rating`}
                  iconActiveElement={
                    <StarIcon fill="#EB5757" stroke="#EB5757" />
                  }
                  iconUnactiveElement={
                    <StarIcon fill="transparent" stroke="#000" />
                  }
                  size={isLessTablet ? '25px' : '20px'}
                  gap="10px"
                  isShowValue={false}
                />
              )}
            />
            <Button className={`${bemBlockName}__btn`}>Отправить</Button>
          </>
        }
        {...register('review', { required: 'Заполните поле "Отзыв"' })}
        error={errors.review?.message || errors.rating?.message}
      />
    </form>
  );
}

export default InputReview;
