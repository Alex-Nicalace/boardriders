import { TApplyMaskFn, TRegisterMaskFn } from './registerMask.types';

/**
 * Регистрация маски ввода для HTMLInputElement на основе заданной маски.
 *
 * @param mask - Строка, представляющая маску, где символ '_' считается цифрой и заменяется на введённую цифру.
 * @param options - Объект с опциональными параметрами:
 *   - isHideMask: boolean, указывает, нужно ли скрывать часть маски после ввода.
 *   - setValue: функция, которая вызывается с текущим значением input после применения маски.
 *
 * @returns Объект с обработчиками событий onChange, onBlur, onFocus и onKeyDown, которые применяют маску к элементу input.
 *
 * Пример использования:
 *
 * ```typescript
 * const mask = "+_ (___) ___-__-__";
 * const options = { isHideMask: true, setValue: console.log };
 * const handlers = registerMask(mask, options);
 *
 * <input type="text" onChange={handlers.onChange} onBlur={handlers.onBlur} onFocus={handlers.onFocus} onKeyDown={handlers.onKeyDown} />
 * ```
 */
export const registerMask: TRegisterMaskFn = (
  mask: string,
  { isHideMask, setValue } = {}
) => {
  const setCursorPosition = (pos: number, elem: HTMLInputElement) => {
    if (document.activeElement === elem) {
      elem.setSelectionRange(pos, pos);
    }
  };

  const applyMask: TApplyMaskFn = (event) => {
    const inputEl = event.target as HTMLInputElement;

    const matrix = mask,
      def = matrix.replace(/\D/g, ''),
      val = inputEl.value.replace(/\D/g, '');
    let i = 0;

    inputEl.value = matrix.replace(/[_\d]/g, function (a) {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });

    if (isHideMask) {
      const i = inputEl.value.indexOf('_');
      if (i > 0) {
        inputEl.value = inputEl.value.slice(0, i);
      }
    }

    /* рег. выраж. негативная опережающая проверка: 
      найти число за которым не следует любое количесво символов, а после этих символов цифра */
    const newPos = inputEl.value.search(/\d(?!.*\d)/) + 1;

    setCursorPosition(newPos, inputEl);

    if (event.type === 'blur') {
      if (val.length === def.length) {
        inputEl.value = '';
      }
    }

    setValue?.(inputEl.value);
  };

  return {
    onChange: (e) => applyMask(e),
    onBlur: (e) => applyMask(e),
    onFocus: (e) => applyMask(e),
    onKeyDown: (e) => applyMask(e),
  };
};
