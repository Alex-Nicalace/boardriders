import { ReactNode, useId, useRef, useState } from 'react';
import './InputDate.scss';
import { CustomError } from '../../../utils/CustomError';

class InputDateError extends CustomError {}

type TPartsDate = [string, string, string];

type TInputDateProps = {
  className?: string;
  label?: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
  id?: string;
  name?: string;
  defaultValue?: Date | null;
  // value?: Date;
  onChange?: (value: Date | null) => void;
};

// * компонент делал смотря структуру InputText.tsx

function convertDateToArray(date: Date): TPartsDate {
  return [
    date.getDate().toString().padStart(2, '0'),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getFullYear().toString().slice(-2),
  ];
}

function convertArrayToDate([day, month, preYear]: TPartsDate) {
  if (!day && !month && !preYear) return null;

  if (!day || !month || !preYear) {
    throw new InputDateError(
      'Invalid date: missing day, month, or year component'
    );
  }

  const year =
    preYear.length === 2
      ? Number(preYear) > 50
        ? `19${preYear}`
        : `20${preYear}`
      : preYear;

  const dateStr = `${year}-${month}-${day}`;
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    throw new InputDateError('Invalid date');
  }

  if (date.getFullYear() !== Number(year)) {
    throw new InputDateError('Invalid year');
  }

  if (date.getMonth() + 1 !== Number(month)) {
    throw new InputDateError('Invalid month');
  }

  if (date.getDate() !== Number(day)) {
    throw new InputDateError('Invalid day');
  }

  return date;
}

function InputDate({
  className,
  label,
  id: propId,
  error,
  hint,
  defaultValue,
  onChange,
  name,
}: TInputDateProps): JSX.Element {
  const [partsDate, setPartsDate] = useState<TPartsDate>(() => {
    if (defaultValue) {
      return convertDateToArray(defaultValue);
    }
    return ['', '', ''];
  });
  const [date, setDate] = useState<Date | null | undefined>(defaultValue);
  const [isInvalid, setIsInvalid] = useState(false);
  const initId = useId();
  const id = propId || initId;
  const itemsRef = useRef<Map<number, HTMLInputElement> | null>(null);

  const dateParts = [
    {
      placeholder: 'дд.',
    },
    {
      placeholder: 'мм.',
    },
    {
      placeholder: 'гг.',
    },
  ];

  /**
   * Возвращает Map itemsRef, инициализируя ее, если она не существует.
   *
   * @return Map itemsRef.
   */
  function getMapItemsRef() {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  /**
   * Функция для изменения фокуса в зависимости от текущего элемента.
   *
   * @param currentPart - Номер текущего элемента в фокусе.
   * @param step - Направление перемещения фокуса.
   * @param isCyclically - Флаг, указывающий на цикличность перемещения фокуса.
   */
  function changeFocus(
    currentPart: number,
    step: 'next' | 'prev',
    isCyclically: boolean = false
  ) {
    const stepSign = step === 'next' ? 1 : -1;
    const prePart = currentPart + stepSign;
    const part = isCyclically
      ? prePart < 0
        ? 2
        : prePart > 2
        ? 0
        : prePart
      : Math.min(Math.max(prePart, 0), 2);
    const changedEl = getMapItemsRef().get(part);
    if (!changedEl) return;
    changedEl.focus();
    if (stepSign === 1) {
      changedEl.selectionStart = 0;
      changedEl.selectionEnd = 0;
    } else {
      changedEl.selectionStart = 2;
      changedEl.selectionEnd = 2;
    }
  }

  function setPartDateData(part: number, value: string) {
    const newDateData = [...partsDate] as TPartsDate;
    newDateData[part] = value;
    setPartsDate(newDateData);

    try {
      const date = convertArrayToDate(newDateData);
      setDate(date);
      setIsInvalid(false);
      if (onChange) {
        onChange(date);
      }
    } catch (error) {
      if (!(error instanceof InputDateError)) {
        throw error;
      } else {
        setIsInvalid(true);
      }
    }
  }

  function incrementPartDateData(part: number, value: number) {
    const newValue = Number(partsDate[part]) + value;
    setPartDateData(part, newValue.toString().slice(-2).padStart(2, '0'));
  }

  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement>,
    part: number
  ) {
    const newValue = e.target.value.replace(/[^0-9]/g, '').slice(-2);
    setPartDateData(part, newValue);

    // если введено 2 знака то переместить фокус в следующую позицию
    if (newValue.length === 2 && part !== 2) changeFocus(part, 'next');
    // если введено 0 знака то переместить фокус в предыдущую позицию. Backspace или Delete
    if (newValue.length === 0 && part !== 0) changeFocus(part, 'prev');
  }

  function handleOnKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    part: number
  ) {
    const el = e.currentTarget;
    const isKeyNumber = !isNaN(Number(e.key));

    // если в текущем инпуте уже введено 2 знака то переместить фокус в следующую позицию
    if (isKeyNumber && el.value.length === 2 && part !== 2)
      changeFocus(part, 'next');

    // если в текущем инпуте пусто, то переместить фокус в предыдущую позицию. Backspace или Delete
    if (e.key === 'Backspace' && el.selectionStart === 0 && part !== 0)
      changeFocus(part, 'prev');

    if (e.key === 'ArrowLeft' && el.selectionStart === 0) {
      e.preventDefault();
      changeFocus(part, 'prev', true);
    }

    if (e.key === 'ArrowRight' && el.selectionStart === 2) {
      e.preventDefault();
      changeFocus(part, 'next', true);
    }

    // инкремент значения
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      incrementPartDateData(part, 1);
    }

    // декремент значения
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      incrementPartDateData(part, -1);
    }
  }

  return (
    <div
      className={['input-date', isInvalid && 'input-date_invalid', className]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        className="input-date__value"
        name={name}
        type="date"
        aria-hidden
        tabIndex={-1}
        defaultValue={date ? date.toISOString().split('T')[0] : ''}
      />
      {(label || error) && (
        <div className="input-date__box-label">
          {label && (
            <label htmlFor={id} className="input-date__label">
              {label}
            </label>
          )}
          {error && <p className="input-date__error">{error}</p>}
        </div>
      )}
      <div className="input-date__box-inputs">
        {dateParts.map(({ placeholder }, index) => (
          <input
            key={index}
            className="input-date__input"
            id={id}
            placeholder={placeholder}
            value={partsDate[index]}
            onChange={(e) => handleOnChange(e, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
            ref={(node) =>
              getMapItemsRef().set(index, node as HTMLInputElement)
            }
            tabIndex={index === 0 ? 0 : -1}
          />
        ))}
      </div>
      {hint && <p className="input-date__hint">{hint}</p>}
    </div>
  );
}

export default InputDate;
