import { createContext, useCallback, useEffect, useState } from 'react';

interface IBurgerContext {
  isOpen: boolean;
  setOpenMenu: (open?: boolean) => void;
}

export const BurgerContext = createContext<IBurgerContext>({
  isOpen: false,
  setOpenMenu: () => {},
});

export default function BurgerProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [isOpen, setOpen] = useState(false);

  useEffect(
    function () {
      if (isOpen) {
        document.documentElement.classList.add('lock', 'menu-open');
      } else {
        document.documentElement.classList.remove('lock', 'menu-open');
      }
    },
    [isOpen]
  );

  const handleOpen = useCallback(function handleOpen(open?: boolean) {
    setOpen((prevOpen) => open ?? !prevOpen);
  }, []);

  return (
    <BurgerContext.Provider value={{ isOpen, setOpenMenu: handleOpen }}>
      {children}
    </BurgerContext.Provider>
  );
}
