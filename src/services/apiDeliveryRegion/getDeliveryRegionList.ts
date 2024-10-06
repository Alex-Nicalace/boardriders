export async function getDeliveryRegionList() {
  return Promise.resolve([
    {
      id: 1,
      name: 'Владивосток',
    },
    {
      id: 2,
      name: 'Москва',
    },
    {
      id: 3,
      name: 'Санкт-Петербург',
    },
    {
      id: 4,
      name: 'Екатеринбург',
    },
    {
      id: 5,
      name: 'Тирасполь',
    },
    {
      id: 6,
      name: 'Бендеры',
    },
  ]);
}
