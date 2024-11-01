export const formaterCurrency = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
}).format;

export const formaterPercent = new Intl.NumberFormat('ru-RU', {
  style: 'percent',
}).format;

export const formaterDate = new Intl.DateTimeFormat('ru', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format;

export const formaterDateTime = new Intl.DateTimeFormat('ru', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}).format;

export const formaterDateShort = new Intl.DateTimeFormat('ru', {
  day: 'numeric',
  month: '2-digit',
  year: 'numeric',
}).format;

export const formaterDateWithWeekday = new Intl.DateTimeFormat('ru', {
  day: 'numeric',
  month: 'long',
  weekday: 'short',
}).format;

export const formaterDecimal = new Intl.NumberFormat('ru-RU', {
  style: 'decimal',
  minimumFractionDigits: 0, // не показывать друбную часть, если ее нет
}).format;
