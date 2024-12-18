# Boradriders

## Попап окно (модальное)

[Popup.tsx](.src/component-library/Popup/Popup.tsx)

## pattern Compound component pattern & Render props pattern

Попап с 2-мя патернами проектирования:

[Popup.tsx](.src/component-library/Popup/Popup.tsx)

## Контекст

[src/Context/ScreenWidthContext.tsx](ScreenWidthContext) - данные о ширине экрана

## Компоненты, кот. можно применить в других проектах

[InputText](./src/component-library/InputText/InputText.tsx)

[ListLinks](./src/component-library/ListLinks/ListLinks.tsx)

[Select](./src/component-library/Select/Select.tsx)

[Details.tsx](./src/component-library/Details/Details.tsx) - Реактовский вариант тега details. Добавлена анимация при взаимодействии.

Есть возможность условно рендерить контентную часть элемента. При рендере контентной части используется хук [useOutsideClick.ts](./src/hooks/useOutsideClick.ts) чтобы схлопывать при клике вне элемента.

Использовал здесь функционал - "Доступ к узлам DOM другого компонента" посредством использования `forwardRef`

Так же решал задачу присвоения узла нескольким ссылкам. Предоставление колбэка атрибуту `ref` можно использовать для присвоения узла нескольким ссылкам.

[Popup.tsx](.src/component-library/Popup/Popup.tsx) попап окно (модальное)

[Transition.tsx](./src/component-library/Transition/Transition.tsx) - Генерирует эффект перехода для указанных дочерних элементов на основе состояния и указанного времени ожидания. Появилась необходимость для анимации условного рендеринга. В поисках решения подобных задач попал на либу [react-transition-group](https://reactcommunity.org/react-transition-group), но так как решение уже было начато решил сделать свою реализацию.

[MediaQuery.tsx](./src/component-library/MediaQuery/MediaQuery.tsx) - В зависимости от ширины документа скрывает дочерние компоненты. Необходим кастомный хук [useMatchMedia.ts](./src/hooks/useMatchMedia.ts)

[Rating](.src/component-library/Rating/Rating.tsx) - звездный рейтинг

[RatingCounts.tsx](src/component-library/RatingCounts/RatingCounts.tsx) - отображает шкалу для каждой оцеки

[InputNumber.tsx](./src/components/ui/InputNumber/InputNumber.tsx) - компонент для ввода числа с кнопками инкремента и декремента

[Tabs.tsx](./src/component-library/Tabs/Tabs.tsx) - компонент Табы

[Pagination](./src/components/ui/Pagination/Pagination.tsx) - пагинация

[ScrollToTop.tsx](./src/component-library/Scroll/ScrollToTop.tsx) - Компонент, который при каждом изменении пути в URL прокручивает страницу вверх. Есть готовый компонент из `react-router-dom` — `<ScrollRestoration />`. Когда делал свою реализацию не знал про наличие этого компонента. У `<ScrollRestoration />` есть ограничение на использование - маршрутизатор данных. Так что мой тоже может пригодится.

[ScrollToAnchor.tsx](./src/component-library/Scroll/ScrollToAnchor.tsx) - Компонент, который прокручивает страницу к элементу, указанному в URL по хешу. Этот функционла есть в готовый компонент из `react-router-dom` — `<ScrollRestoration />`

[InputDate.tsx](src/components/ui/InputDate/InputDate.tsx) - Компонент ввода даты. Ввод компонентов даты по отдельности, 3 инпута.

## Хуки

### Стандартные хуки

[useId](https://react.dev/reference/react/useId) - генерации уникальных идентификаторов

### Кастомные хуки

[useLockDocumentScroll.ts](./src/hooks/useLockDocumentScroll.ts) Пользовательский хук для блокировки прокрутки документа при вызове.

[useMatchMedia.ts](./src/hooks/useMatchMedia.ts) Хук получает массив с медиа запросами, результат массив логических значений, обозначающих удовлетворяется ли медиа запрос.

[useOutsideClick.ts](./src/hooks/useOutsideClick.ts) Хук получает колбэк, который будет обработан при клике вне элемента.

[usePrevious.ts](./src/hooks/usePrevious.ts) Хук, который возвращает предыдущее значение входного параметра из предыдущего рендера.

[useResizeObserver.ts](.src/hooks/useResizeObserver.ts) Хук, который получает массив ссылок на HTMLElements и возвращает соответствующий массив размемеров этих переданных в качестве аругумента массива элементов.

[useForwardRef.ts](./src/hooks/useForwardRef.ts) или можно назвать `useCopyRef` Когда используется "Доступ к узлам DOM другого компонента" посредством использования `forwardRef` и в самом дочернем элементе необходимо использовать ссылку, то этот хук в помощь. в итоге и родительский компонент имеет ссылку и местная ссылка в деле и обе ссылке указывают на один и тот же узел

[useScreenWidthContext](./src/Context/useScreenWidthContext.ts) - данные о ширине экрана

[useLocalStorageState.ts](./src/hooks/useLocalStorageState.ts) - Хук создает состояние, которое сохраняется в локальное хранилище браузера

[useSearchParamsObject.ts](./src/hooks/useSearchParamsObject.ts) - Хук примичателен использванием TS - Mapped Types получает массив строк, и выводит результат таким образом, что получается объект ключи которого являюся элементами массива и эти ключи по условию модифицируются.

## CSS

### clip-path

Использовал для декорации футера

`clip-path: polygon(x y, x,y, ... )` - [Footer.scss](./src/components/Footer/Footer.scss)

## Utils

[extractTextFromReactNode.ts](src/utils/extractTextFromReactNode.ts) - Функция принимает `React.ReactNode` и возвращает только текстовые данные. Функция рекурсивная.

[randomString.ts](src/utils/randomString.ts) - случайная строка. То для каких целей я использовал в проекте можно заменить хуком `useId`

[visibilityScrollDocument.ts](src/utils/visibilityScrollDocument.ts) - скрыть/показать скролл документа, перестал использовать после создания хука [useLockDocumentScroll.ts](./src/hooks/useLockDocumentScroll.ts)

[numberFormat.ts](./src/utils/numberFormat.ts) - форматирование числа разделителем разрядов. В контексте форматирования числа под денежный формат можно восаользоваться объектом `Intl` [Price.tsx](./src/components/Price/Price.tsx)

[omit.ts](./src/utils/omit.ts) - функция, исключающая из объекта указанные свойства

[throttle.ts](./src/utils/throttle.ts) - Возвращает заторможенную версию предоставленной функции используется в [Tabs.tsx](./src/component-library/Tabs/Tabs.tsx)

[tuple.ts](./src/utils/types/tuple.ts) - самописная утилита для создания кортежа произвольной длины

[registerMask.ts](.src/utils/registerMask/registerMask.ts) - Возвращает объект обработчиков событий для input, которые преобразуют вводимый текст в соответствии с маской.

[loadFromLocalStorage.ts](.src/utils/loadFromLocalStorage.ts) - Возвращает данные из localStorage по ключу key

## Object Intl - перевод и форматирование текста на разных языках

### Intl.NumberFormat

- [FormatersContext.tsx](./src/Context/FormatersContext.tsx)

### Intl.DateTimeFormat

- [FormatersContext.tsx](./src/Context/FormatersContext.tsx)

## react-query

`queryClient.prefetchQuery` - предварительная подгрузка страницы. [useReviews](./src/features/reviews/useReviews.ts)

## Компоненты `react-router-dom`

### ScrollRestoration

`<ScrollRestoration />` — это компонент, отвечающий за управление прокруткой страниц при навигации в приложении. Он сбрасывает позицию при попадании на новый маршрут, восстанавливает позицию прокрутки при возвращении на предыдущие страницы или обновлении приложения, что улучшает пользовательский опыт.
