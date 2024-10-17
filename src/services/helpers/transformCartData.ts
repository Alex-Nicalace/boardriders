import { omit } from '../../utils/omit';

/**
 * Преобразует массив объектов с данными о товаре в формат, требуемый для
 * отображения в корзине
 *
 * @param data - массив объектов с данными о товаре
 *
 * @returns массив объектов, где для каждого товара были
 *   заменены свойства color, size, colorId, sizeId на
 *   массив объектов { name, value, id, nameDisplay }.
 *   name - свойство, value - значение, id - id значения,
 *   nameDisplay - отображаемое имя свойства
 */
export function transformCartData<
  T extends { colorId: number; sizeId: number; color: string; size: string }
>(data: T[]) {
  return data.map((item) => ({
    ...omit(item, ['colorId', 'sizeId', 'color', 'size']),
    props: [
      {
        name: 'color',
        value: item.color,
        id: item.colorId,
        nameDisplay: 'Цвет',
      },
      {
        name: 'size',
        value: item.size,
        id: item.sizeId,
        nameDisplay: 'Размер',
      },
    ],
  }));
}
