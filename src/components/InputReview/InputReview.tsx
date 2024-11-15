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
  disabled,
  onSubmit,
}: TInputReviewProps): JSX.Element {
  const { isLessTablet } = useScreenWidth();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TInputReviewForm>({ defaultValues: { rating: 0 } });
  const bemBlockName = `input-review${type === 'column' ? '-column' : ''}`;

  function handleFormSubmit(data: TInputReviewForm) {
    onSubmit?.(data, reset);
  }

  return (
    <form className={className} onSubmit={handleSubmit(handleFormSubmit)}>
      <InputText
        bemBlockName={bemBlockName}
        placeholder="Оставьте отзыв"
        disabled={disabled}
        endAdornment={
          <>
            <Controller
              name="rating"
              control={control}
              rules={{
                required: 'Укажите оценку',
                min: { value: 1, message: 'Укажите оценку' },
              }}
              disabled={disabled}
              render={({ field: { value, onChange, disabled } }) => (
                <Rating
                  rating={value}
                  onChangeRating={onChange}
                  className={`${bemBlockName}__rating`}
                  disabled={disabled}
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
            <Button className={`${bemBlockName}__btn`} disabled={disabled}>
              Отправить
            </Button>
          </>
        }
        {...register('comment', { required: 'Заполните поле "Отзыв"' })}
        error={errors.comment?.message || errors.rating?.message}
      />
    </form>
  );
}

export default InputReview;
