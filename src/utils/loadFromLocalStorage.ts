/**
 * Возвращает данные из localStorage по ключу key. Если данные не могут быть
 * десериализованы, то возвращает undefined.
 *
 * @param {string} key
 */
export function loadFromLocalStorage<T>(key: string) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState ? (JSON.parse(serializedState) as T) : undefined;
  } catch (error) {
    console.warn('Не удалось загрузить данные из localStorage:', error);
    return undefined;
  }
}
