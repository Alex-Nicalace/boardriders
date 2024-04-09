# Boradriders

## Компоненты, кот. можно применить в других проектах

[InputText](./src/component-library/InputText/InputText.tsx)

[ListLinks](./src/component-library/ListLinks/ListLinks.tsx)

[Select](./src/component-library/Select/Select.tsx)

[Details.tsx](./src/component-library/Details/Details.tsx) - Реактовский вариант тега details. Добавлена анимация при взаимодействии.

Есть возможность условно рендерить контентную часть элемента. При рендере контентной части используется хук [useOutsideClick.ts](./src/hooks/useOutsideClick.ts) чтобы схлопывать при клике вне элемента.

Использовал здесь функционал - "Доступ к узлам DOM другого компонента" посредством использования `forwardRef`

Так же решал задачу присвоения узла нескольким ссылкам. Предоставление колбэка атрибуту `ref` можно использовать для присвоения узла нескольким ссылкам.

[Transition.tsx](./src/component-library/Transition/Transition.tsx) - Генерирует эффект перехода для указанных дочерних элементов на основе состояния и указанного времени ожидания. Появилась необходимость для анимации условного рендеринга. В поисках решения подобных задач попал на либу [react-transition-group](https://reactcommunity.org/react-transition-group), но так как решение уже было начато решил сделать свою реализацию.

[MediaQuery.tsx](./src/component-library/MediaQuery/MediaQuery.tsx) - В зависимости от ширины документа скрывает дочерние компоненты. Необходим кастомный хук [useMatchMedia.ts](./src/hooks/useMatchMedia.ts)

## Кастомные хуки

[useLockDocumentScroll.ts](./src/hooks/useLockDocumentScroll.ts) Пользовательский хук для блокировки прокрутки документа при вызове.

[useMatchMedia.ts](./src/hooks/useMatchMedia.ts) Хук получает массив с медиа запросами, результат массив логических значений, обозначающих удовлетворяется ли медиа запрос.

[useOutsideClick.ts](./src/hooks/useOutsideClick.ts) Хук получает колбэк, который будет обработан при клике вне элемента.

[usePrevious.ts](./src/hooks/usePrevious.ts) Хук, который возвращает предыдущее значение входного параметра из предыдущего рендера.

[useForwardRef.ts](src/hooks/useForwardRef.ts) или можно назвать `useCopyRef` Когда используется "Доступ к узлам DOM другого компонента" посредством использования `forwardRef` и в самом дочернем элементе необходимо использовать ссылку, то этот хук в помощь. в итоге и родительский компонент имеет ссылку и местная ссылка в деле и обе ссылке указывают на один и тот же узел

## Хуки

[useId](https://react.dev/reference/react/useId) - генерации уникальных идентификаторов

## CSS

### clip-path

Использовал для декорации футера

`clip-path: polygon(x y, x,y, ... )` - [Footer.scss](./src/components/Footer/Footer.scss)

## Utils

[extractTextFromReactNode.ts](src/utils/extractTextFromReactNode.ts) - Функция принимает `React.ReactNode` и возвращает только текстовые данные. Функция рекурсивная.

[randomString.ts](src/utils/randomString.ts) - случайная строка. То для каких целей я использовал в проекте можно заменить хуком `useId`

[visibilityScrollDocument.ts](src/utils/visibilityScrollDocument.ts) - скрыть/показать скролл документа, перестал использовать после создания хука [useLockDocumentScroll.ts](./src/hooks/useLockDocumentScroll.ts)
