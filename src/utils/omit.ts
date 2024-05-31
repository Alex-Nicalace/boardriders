export function omit<T extends object, K extends keyof T>(
  obj: T,
  fields: K | K[]
): Omit<T, K> {
  const fieldsSet = new Set(Array.isArray(fields) ? fields : [fields]);

  return Object.keys(obj).reduce((result, key) => {
    if (!fieldsSet.has(key as K)) {
      result[key as keyof T] = obj[key as keyof T];
    }
    return result;
  }, {} as T);
}
