export const getStartOfMonth = () => {
  const currentDate = new Date();
  return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
};

export const getEndOfMonth = () => {
  const currentDate = new Date();
  return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
};