export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatMoney = (value, currency = 'USD') => {
    return Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency,
      currencyDisplay: 'narrowSymbol',
    }).format(value);
}

export const formatNumber = (number) => {
    return Intl.NumberFormat('es-ES').format(number);
}