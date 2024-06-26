interface ILinkData {
  title: string;
  to: string;
  // isMark?: boolean;
  isAccented?: boolean;
}

export interface IMenuData extends ILinkData {
  submenu?: {
    sections: {
      title: string;
      isWideSection?: boolean;
      links: ILinkData[];
    }[];
    imgLinkData?: {
      src: string;
      to: string;
      title?: string;
    };
  };
}

export function isIMenuData(obj: any): obj is IMenuData {
  return 'title' in obj && 'to' in obj;
}

export const MENU_DATA: IMenuData[] = [
  {
    to: '/test',
    title: 'Колекции',
    submenu: {
      sections: [
        {
          title: 'Категории',
          isWideSection: true,
          links: [
            {
              to: '#',
              title: 'Новая коллекция',
              // isMark: true,
            },
            { to: '#', title: 'Online Exclusive' },
            {
              to: '#',
              title: 'Billabong Adventure Division',
            },
            {
              to: '#',
              title: 'Quiksilver Outdoor',
              // isMark: true,
            },
            {
              to: '#',
              title: 'Quiksilver Surf the Mountain',
            },
            { to: '#', title: 'Take a chance' },
            { to: '#', title: 'DC STAR WARS' },
            { to: '#', title: 'Element Wolfeboro' },
            {
              to: '#',
              title: 'DC Shoes x FTP',
              // isMark: true,
            },
            { to: '#', title: 'RVCA x Mister Cartoon' },
            { to: '#', title: 'DC Shoes Deadpool' },
            { to: '#', title: 'Element x Public Enemy' },
            {
              to: '#',
              title: 'Quiksilver Surfers of Fortune',
            },
            { to: '#', title: 'Quiksilver x Saturday NYC' },
            {
              to: '#',
              title: 'Все категории',
              isAccented: true,
            },
          ],
        },
        {
          title: 'Бренды',
          links: [
            { to: '#', title: 'Roxy' },
            { to: '#', title: 'VONZIPPER' },
            { to: '#', title: 'RVCA' },
            { to: '#', title: 'Element' },
            { to: '#', title: 'Billabong' },
            { to: '#', title: 'DC Shoes' },
            { to: '#', title: 'QUIKSILVER' },
            {
              to: '#',
              title: 'Все бренды',
              isAccented: true,
            },
          ],
        },
      ],
      imgLinkData: {
        src: '/img/menu/01.jpg',
        to: '#',
        title: 'Название акции',
      },
    },
  },
  {
    to: '#',
    title: 'Обувь',
    submenu: {
      sections: [
        {
          title: 'Категории',
          isWideSection: true,
          links: [
            {
              to: '#',
              title: 'Новая коллекция',
            },
            {
              to: '#',
              title: 'Зимняя обувь',
            },
            {
              to: '#',
              title: 'Кеды',
            },
            {
              to: '#',
              title: 'Сланцы и сандалии',
            },
            {
              to: '#',
              title: 'Слипоны и эспадрильи',
            },
            {
              to: '#',
              title: 'Все категории',
              isAccented: true,
            },
          ],
        },
        {
          title: 'Бренды',
          links: [
            { to: '#', title: 'Billabong' },
            { to: '#', title: 'Element' },
            { to: '#', title: 'QUIKSILVER' },
            { to: '#', title: 'DC Shoes' },
            {
              to: '#',
              title: 'Все бренды',
              isAccented: true,
            },
          ],
        },
      ],
      imgLinkData: {
        src: '/img/menu/02.jpg',
        to: '#',
        title: 'Название акции',
      },
    },
  },
  {
    to: '#',
    title: 'Одежда',
    submenu: {
      sections: [
        {
          title: 'Категории',
          isWideSection: true,
          links: [
            {
              to: '#',
              title: 'Новая коллекция',
            },
            {
              to: '#',
              title: 'Верхняя одежда',
            },
            {
              to: '#',
              title: 'Толстовки и флис',
            },
            {
              to: '#',
              title: 'Джинсы',
            },
            {
              to: '#',
              title: 'Футболки поло и лонгсливы',
            },
            {
              to: '#',
              title: 'Брюки и джоггеры',
            },
            {
              to: '#',
              title: 'Рубашки',
            },
            {
              to: '#',
              title: 'Шорты',
            },
            {
              to: '#',
              title: 'Нижнее белье',
            },
            {
              to: '#',
              title: 'Кардиганы свитеры и джемперы',
            },
            {
              to: '#',
              title: 'Плавки и шорты для плавания',
            },
            {
              to: '#',
              title: 'Майки',
            },
            {
              to: '#',
              title: 'Все категории',
              isAccented: true,
            },
          ],
        },
        {
          title: 'Бренды',
          links: [
            { to: '#', title: 'Billabong' },
            { to: '#', title: 'RVCA' },
            { to: '#', title: 'Element' },
            { to: '#', title: 'DC Shoes' },
            { to: '#', title: 'QUIKSILVER' },
            {
              to: '#',
              title: 'Все бренды',
              isAccented: true,
            },
          ],
        },
      ],
      imgLinkData: {
        src: '/img/menu/03.jpg',
        to: '#',
        title: 'Название акции',
      },
    },
  },
  {
    to: '#',
    title: 'Аксессуары',
    submenu: {
      sections: [
        {
          title: 'Категории',
          isWideSection: true,
          links: [
            {
              to: '#',
              title: 'Новая коллекция',
            },
            {
              to: '#',
              title: 'Головные уборы',
            },
            {
              to: '#',
              title: 'Рюкзаки',
            },
            {
              to: '#',
              title: 'Солнцезащитные очки"',
            },
            {
              to: '#',
              title: 'Носки',
            },
            {
              to: '#',
              title: 'Сумки и чемоданы',
            },
            {
              to: '#',
              title: 'Кошельки',
            },
            {
              to: '#',
              title: 'Платки и шарфы',
            },
            {
              to: '#',
              title: 'Ремни',
            },
            {
              to: '#',
              title: 'Перчатки и варежки',
            },
            {
              to: '#',
              title: 'Прочие Аксессуары',
            },
            {
              to: '#',
              title: 'Все категории',
              isAccented: true,
            },
          ],
        },
        {
          title: 'Бренды',
          links: [
            { to: '#', title: 'Buff' },
            { to: '#', title: 'Billabong' },
            { to: '#', title: 'VONZIPPER' },
            { to: '#', title: 'RVCA' },
            { to: '#', title: 'Element' },
            { to: '#', title: 'DC Shoes' },
            { to: '#', title: 'QUIKSILVER' },
            {
              to: '#',
              title: 'Все бренды',
              isAccented: true,
            },
          ],
        },
      ],
      imgLinkData: {
        src: '/img/menu/04.jpg',
        to: '#',
        title: 'Название акции',
      },
    },
  },
  { to: '#', title: 'Сноуборд' },
  { to: '#', title: 'Фитнес и бег' },
  { to: '#', title: 'Бордшорты' },
  { to: '#', title: 'Серф и вейк' },
  { to: '#', title: 'Скейтборд' },
  {
    to: '#',
    title: 'Распродажа',
    isAccented: true,
  },
];
