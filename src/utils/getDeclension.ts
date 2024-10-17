export function getDeclension(
  count: number,
  one: string,
  few: string,
  many: string
) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return `${count} ${one}`; // 1 товар
  } else if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)
  ) {
    return `${count} ${few}`; // 2-4 товара
  } else {
    return `${count} ${many}`; // 5+ товаров
  }
}
