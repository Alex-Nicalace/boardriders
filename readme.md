# Boardriders

**Boardriders** — клиент-серверное приложение для интернет-магазина, разработанное на React (TypeScript) с бекэндом на Supabase.

[Демо](https://boardriders-one.vercel.app/)

Технологии и стек:

- Frontend: React, TypeScript, React Router, React Hook Form
- Глобальное состояние: Redux Toolkit (для локального хранения корзины и избранного), React Query (для работы с бэкендом)
- Стилизация: SCSS (БЭМ), Swiper (слайдер)
- Аутентификация: Supabase (email/password)
- Производительность: Code splitting (React.lazy + Suspense), оптимизированные изображения
- Деплой: Vercel

Ключевые функции:

- Адаптивный UI без сторонних UI-библиотек, с учетом удобства на мобильных устройствах
- Фильтрация и сортировка товаров по категориям (мужчинам, женщинам, детям)
- Корзина и избранное:
  - Неавторизованные пользователи — хранение в localStorage
  - Авторизованные пользователи — хранение в базе данных Supabase
- Уведомления: всплывающие тосты при добавлении товара в корзину
- Оформление заказа:
  - Выбор города, способа доставки, адреса, варианта оплаты
  - Возможность оставить комментарий к заказу
- Отображение заказов в личном кабинете (со статусом pending)
- Защита роутов: скрытие личного кабинета и других страниц для неавторизованных пользователей

## Установка и запуск

```bash
git clone https://github.com/Alex-Nicalace/boardriders.git
cd boardriders
npm install
npm run dev
```

## Контекст

[ScreenWidthContext](./src/Context/ScreenWidthContext.tsx) - данные о ширине экрана

## Компоненты, кот. можно применить в других проектах

[component-library](./src/component-library) — Директория с компонентами, которые можно применить в других проектах.

- [Popup.tsx](./src/component-library/Popup/Popup.tsx)
  - Попап с 2-мя патернами проектирования:
    - Compound component pattern
    - Render props
- [InputText](./src/component-library/InputText/InputText.tsx)
  - Компонент ввода.
  - Имеет пропсы для вывода ошибки и подсказок.
- [ListLinks](./src/component-library/ListLinks/ListLinks.tsx)
  - Рендер массива ссылок
- [Select](./src/component-library/Select/Select.tsx)
  - Компонент кастомного варианта выпадающего списка.
- [Details.tsx](./src/component-library/Details/Details.tsx)
  - Компонент-обертка для `<details>`.
  - Добавлена анимация при взаимодействии.
  - Есть возможность условно рендерить контентную часть элемента. При рендере контентной части используется хук [useOutsideClick.ts](./src/hooks/useOutsideClick.ts) чтобы схлопывать при клике вне элемента.
  - Использовал здесь функционал - "Доступ к узлам DOM другого компонента" посредством использования `forwardRef`
  - Так же решал задачу присвоения узла нескольким ссылкам. Предоставление колбэка атрибуту `ref` можно использовать для присвоения узла нескольким ссылкам.
- [Transition.tsx](./src/component-library/Transition/Transition.tsx)
  - Генерирует эффект перехода для указанных дочерних элементов на основе состояния и указанного времени ожидания.
  - Для анимации условного рендеринга рассматривал `react-transition-group`, но решил реализовать собственное решение.
- [MediaQuery.tsx](./src/component-library/MediaQuery/MediaQuery.tsx)
  - В зависимости от ширины документа скрывает дочерние компоненты. Необходим кастомный хук [useMatchMedia.ts](./src/hooks/useMatchMedia.ts)
- [Rating](.src/component-library/Rating/Rating.tsx)
  - звездный рейтинг
- [RatingCounts.tsx](src/component-library/RatingCounts/RatingCounts.tsx)
  - отображает шкалу для каждой оцеки
- [InputNumber.tsx](./src/components/ui/InputNumber/InputNumber.tsx)
  - компонент для ввода числа с кнопками инкремента и декремента
- [Tabs.tsx](./src/component-library/Tabs/Tabs.tsx)
  - компонент Табы
- [Pagination](./src/components/ui/Pagination/Pagination.tsx)
  - пагинация
- [ScrollToTop.tsx](./src/component-library/Scroll/ScrollToTop.tsx)
  - Компонент, который при каждом изменении пути в URL прокручивает страницу вверх.
  - Есть готовый компонент из `react-router-dom` — `<ScrollRestoration />`. Когда делал свою реализацию не знал про наличие этого компонента. У `<ScrollRestoration />` есть ограничение на использование - маршрутизатор данных. Так что мой тоже может пригодится.
- [ScrollToAnchor.tsx](./src/component-library/Scroll/ScrollToAnchor.tsx)
  - Компонент, который прокручивает страницу к элементу, указанному в URL по хешу.
  - Этот функционла есть в компоненте из `react-router-dom` — `<ScrollRestoration />`
- [InputDate.tsx](src/components/ui/InputDate/InputDate.tsx)
  - Компонент ввода даты. Ввод компонентов даты по отдельности, 3 инпута.

## Хуки

### Стандартные хуки

- [useId](https://react.dev/reference/react/useId)
  - генерации уникальных идентификаторов

### Кастомные хуки

- [useLockDocumentScroll.ts](./src/hooks/useLockDocumentScroll.ts)
  - Пользовательский хук для блокировки прокрутки документа при вызове.
  - Можно использовать для некого модального окна.
- [useMatchMedia.ts](./src/hooks/useMatchMedia.ts)
  - Хук получает массив с медиа запросами, результат массив логических значений, обозначающих удовлетворяется ли медиа запрос.
- [useOutsideClick.ts](./src/hooks/useOutsideClick.ts)
  - Хук получает колбэк, который будет обработан при клике вне элемента.
  - Можно использовать для клика вне некого всплывающего окна.
- [usePrevious.ts](./src/hooks/usePrevious.ts)
  - Возвращает предыдущее значение состояния или пропса.
- [useResizeObserver.ts](.src/hooks/useResizeObserver.ts)
  - Хук, который получает массив ссылок на HTMLElements и возвращает соответствующий массив размемеров этих переданных в качестве аругумента массива элементов.
- [useForwardRef.ts](./src/hooks/useForwardRef.ts)
  - или можно назвать `useCopyRef` Когда используется "Доступ к узлам DOM другого компонента" посредством использования `forwardRef` и в самом дочернем элементе необходимо использовать ссылку, то этот хук в помощь. в итоге и родительский компонент имеет ссылку и местная ссылка в деле и обе ссылке указывают на один и тот же узел
- [useScreenWidthContext](./src/Context/useScreenWidthContext.ts)
  - данные о ширине экрана
  - берет данные из [ScreenWidthContext](./src/Context/ScreenWidthContext.tsx)
- [useLocalStorageState.ts](./src/hooks/useLocalStorageState.ts)
  - Хук создает состояние, которое сохраняется в локальное хранилище браузера
- [useSearchParamsObject.ts](./src/hooks/useSearchParamsObject.ts)
  - Хук примичателен использванием TS - Mapped Types получает массив строк, и выводит результат таким образом, что получается объект ключи которого являюся элементами массива и эти ключи по условию модифицируются.

## CSS

### clip-path

Использовал для декорации футера

`clip-path: polygon(x y, x,y, ... )` - [Footer.scss](./src/components/Footer/Footer.scss)

## Utils

- [extractTextFromReactNode.ts](src/utils/extractTextFromReactNode.ts)
  - Функция принимает `React.ReactNode` и возвращает только текстовые данные.
  - Функция рекурсивная.
- [randomString.ts](src/utils/randomString.ts)
  - случайная строка.
  - То для каких целей я использовал в проекте можно заменить хуком `useId`
- [visibilityScrollDocument.ts](src/utils/visibilityScrollDocument.ts)
  - скрыть/показать скролл документа, перестал использовать после создания хука [useLockDocumentScroll.ts](./src/hooks/useLockDocumentScroll.ts)
- [numberFormat.ts](./src/utils/numberFormat.ts)
  - форматирование числа разделителем разрядов.
  - В контексте форматирования числа под денежный формат можно восаользоваться объектом `Intl` как здесь — [Price.tsx](./src/components/Price/Price.tsx)
- [omit.ts](./src/utils/omit.ts)
  - функция, исключающая из объекта указанные свойства
- [throttle.ts](./src/utils/throttle.ts)
  - Возвращает заторможенную версию предоставленной функции используется в [Tabs.tsx](./src/component-library/Tabs/Tabs.tsx)
- [tuple.ts](./src/utils/types/tuple.ts)
  - самописная утилита для создания кортежа произвольной длины
- [registerMask.ts](.src/utils/registerMask/registerMask.ts)
  - Возвращает объект обработчиков событий для `input`, которые преобразуют вводимый текст в соответствии с маской.
- [loadFromLocalStorage.ts](.src/utils/loadFromLocalStorage.ts)
  - Возвращает данные из `localStorage` по ключу `key`

## Object Intl - перевод и форматирование текста на разных языках

- `Intl.NumberFormat`
  - Использовал - [FormatersContext.tsx](./src/Context/FormatersContext.tsx)
- `Intl.DateTimeFormat`
  - Использовал — [FormatersContext.tsx](./src/Context/FormatersContext.tsx)

## react-query

`queryClient.prefetchQuery` - предварительная подгрузка страницы. [useReviews](./src/features/reviews/useReviews.ts)

## Компоненты `react-router-dom`

### ScrollRestoration

`<ScrollRestoration />` — это компонент, отвечающий за управление прокруткой страниц при навигации в приложении. Он сбрасывает позицию при попадании на новый маршрут, восстанавливает позицию прокрутки при возвращении на предыдущие страницы или обновлении приложения, что улучшает пользовательский опыт.
