/**
 * Возвращает заторможенную версию предоставленной функции обратного вызова.
 * Заторможенная функция будет выполняться только один раз в то время,
 * когда между каждым выполнением будет задержка в указанное количество миллисекунд.
 *
 * @param func - Функция, которую нужно затормозить.
 * @param ms - Задержка в миллисекундах между каждым выполнением.
 * @return Заторможенная функция.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  ms: number
): (...args: Parameters<T>) => Promise<ReturnType<T> | void> {
  let isThrottled = false;
  let savedArgs: Parameters<T> | null = null;
  let savedThis: any = null;

  function wrapper(
    this: any,
    ...args: Parameters<T>
  ): Promise<ReturnType<T> | void> {
    return new Promise((resolve, reject) => {
      if (isThrottled) {
        savedArgs = args;
        savedThis = this;
        return resolve(); // Разрешаем промис сразу без выполнения функции
      }

      try {
        const result = func.apply(this, args);
        resolve(result);
      } catch (error) {
        reject(error);
      }

      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs).then(resolve).catch(reject);
          savedArgs = savedThis = null;
        }
      }, ms);
    });
  }

  return wrapper;
}
