export function formatPrice(price) {
  return Number(price || 0).toLocaleString('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  });
}

export function formatDate(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
