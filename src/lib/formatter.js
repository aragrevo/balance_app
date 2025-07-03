export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatMoney = (value, currency = 'EUR') => {
    return Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency,
      currencyDisplay: 'narrowSymbol',
      maximumFractionDigits: currency === 'COP' ? 0 : 2,
    }).format(value);
}

export const formatNumber = (number) => {
    return Intl.NumberFormat('es-ES').format(number);
}