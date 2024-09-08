export function loadFromLocalStorage<T>(key: string) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? (JSON.parse(storedValue) as T) : null;
}
