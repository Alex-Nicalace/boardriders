import { createContext, useMemo } from 'react';

export interface IFormatersContext {
  formaterCurrency: (value: number) => string;
  formaterPercent: (value: number) => string;
  formaterDecimal: (value: number) => string;
  formaterDate: (value: Date) => string;
  formaterDateWithWeekday: (value: Date) => string;
  formaterDateShort: (value: Date) => string;
}

export const FormatersContext = createContext<IFormatersContext | null>(null);

function FormatersProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(() => {
    const formaterCurrency = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format;

    const formaterPercent = new Intl.NumberFormat('ru-RU', {
      style: 'percent',
    }).format;

    const formaterDate = new Intl.DateTimeFormat('ru', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format;

    const formaterDateShort = new Intl.DateTimeFormat('ru', {
      day: 'numeric',
      month: '2-digit',
      year: 'numeric',
    }).format;

    const formaterDateWithWeekday = new Intl.DateTimeFormat('ru', {
      day: 'numeric',
      month: 'long',
      weekday: 'short',
    }).format;

    const formaterDecimal = new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
      minimumFractionDigits: 0, // не показывать друбную часть, если ее нет
    }).format;

    return {
      formaterCurrency,
      formaterPercent,
      formaterDate,
      formaterDateShort,
      formaterDecimal,
      formaterDateWithWeekday,
    };
  }, []);

  return (
    <FormatersContext.Provider value={value}>
      {children}
    </FormatersContext.Provider>
  );
}

export default FormatersProvider;
