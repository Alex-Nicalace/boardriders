/**
 * Форматирует число, удаляя из него все нециферные символы и вставляет разделитель каждые 3 цифры.
 *
 * @param x - Число для форматирования.
 * @param - Разделитель, который будет вставляться каждые 3 цифры. По умолчанию - пробел.
 * @return Отформатированное число в виде строки.
 */
export function numberFormat(x: number, separator = ' ') {
  return x
    .toString()
    .replace(/[^-0-9]/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}
