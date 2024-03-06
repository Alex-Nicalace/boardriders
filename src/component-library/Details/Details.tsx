import { DetailsHTMLAttributes, useRef } from 'react';

type IAnimationData = {
  isClosing: boolean;
  isExpanding: boolean;
  animation: Animation | null;
};

type TDetailsProps = DetailsHTMLAttributes<HTMLDetailsElement> & {
  summaryNode?: React.ReactNode;
  contentNode?: React.ReactNode;
  animationOptions?: {
    duration?: number;
    timingFunction?: string;
  };
  disabled?: boolean;
};
function Details({
  children,
  animationOptions = {},
  summaryNode,
  contentNode,
  disabled = false,
  ...props
}: TDetailsProps): JSX.Element {
  const { duration = 300, timingFunction = 'ease-out' } = animationOptions;
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationDataRef = useRef<IAnimationData>({
    isClosing: false,
    isExpanding: false,
    animation: null,
  });

  function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.preventDefault(); // отменить поведение по умолчанию
    if (disabled) return;
    const detailsEl = detailsRef.current;
    if (!detailsEl) return;

    const { isClosing, isExpanding } = animationDataRef.current;
    // если details уже открыт или открывается, то закрыть
    if (isClosing || !detailsEl.open) {
      open();
      // если details уже закрыт или закрывается, то открыть
    } else if (isExpanding || detailsEl.open) {
      shrink();
    }
  }

  function open() {
    const detailsEl = detailsRef.current;
    if (!detailsEl) return;
    if (detailsEl.open) return;

    detailsEl.style.overflow = 'hidden'; // скрыть переполнение
    detailsEl.style.height = `${detailsEl.offsetHeight}px`; // захардкодить высоту в закрытом сосотоянии
    detailsEl.open = true; // открыть, но видимости открытия не видно, т.к. высота не позволяет
    requestAnimationFrame(() => expand()); // запустить анимацию открытия
  }

  function shrink() {
    const detailsEl = detailsRef.current;
    const summaryEl = summaryRef.current;
    if (!detailsEl || !detailsEl.open || !summaryEl) return;

    const animationData = animationDataRef.current;
    detailsEl.style.overflow = 'hidden'; // скрыть переполнение
    animationData.isClosing = true; // включить флаг закрытия

    const startHeight = `${detailsEl.offsetHeight}px`; // высота в открытом состоянии
    const endHeight = `${summaryEl.offsetHeight}px`; // высота в закрытом состоянии

    // Если анимация уже запущена
    if (animationData.animation) {
      animationData.animation.cancel(); // остановить анимацию
    }

    // Запустить анимацию
    animationData.animation = detailsEl.animate(
      {
        // параметры анимации
        height: [startHeight, endHeight],
      },
      {
        duration,
        easing: timingFunction,
      }
    );

    animationData.animation.onfinish = () => onAnimationFinish(false); // установить обработчик завершения анимации
    animationData.animation.oncancel = () => (animationData.isClosing = false); // установить обработчик отмены анимации
  }

  function expand() {
    const detailsEl = detailsRef.current;
    const summaryEl = summaryRef.current;
    const contentEl = contentRef.current;
    if (!detailsEl || !summaryEl || !contentEl) return;

    const animationData = animationDataRef.current;
    animationData.isExpanding = true; // установить флаг, что анимация в стадии открытия
    const startHeight = `${detailsEl.offsetHeight}px`; // высота закрытого состояния
    const endHeight = `${summaryEl.offsetHeight + contentEl.offsetHeight}px`; // высота открытого состояния (высота summary + высота content)

    // если есть текущая анимация, отменить ее
    if (animationData.animation) {
      animationData.animation.cancel();
    }

    // запустить анимацию Web Animation API
    animationData.animation = detailsEl.animate(
      {
        // ключевые кадры от начальной высоты до конечной высоты
        height: [startHeight, endHeight],
      },
      {
        duration,
        easing: timingFunction,
      }
    );

    // обработчик завершения анимации
    animationData.animation.onfinish = () => onAnimationFinish(true);
    // обработчик отмены анимации
    animationData.animation.oncancel = () =>
      (animationDataRef.current.isExpanding = false);
  }

  function onAnimationFinish(open: boolean) {
    const detailsEl = detailsRef.current;
    const summaryEl = summaryRef.current;
    const contentEl = contentRef.current;
    if (!detailsEl || !summaryEl || !contentEl) return;

    const animationData = animationDataRef.current;
    detailsEl.open = open; // открыть или закрыть detail на основе пораметра open
    animationData.animation = null; // сбросить анимацию
    animationData.isClosing = false; // сбросить флаг закрытия
    animationData.isExpanding = false; // сбросить флаг открытия
    detailsEl.style.height = detailsEl.style.overflow = ''; // сбросить высоту и overflow
  }

  return (
    <details ref={detailsRef} {...props}>
      <summary ref={summaryRef} onClick={handleClick}>
        {summaryNode}
      </summary>
      <div ref={contentRef}>{contentNode}</div>
    </details>
  );
}

export default Details;
