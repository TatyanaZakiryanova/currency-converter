export const getLastThreeDays = () => {
  const today = new Date();
  const dates = [];

  for (let i = 0; i < 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i); //сдвиг на i дней назад
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); //getMonth() возвращает месяц от 0 до 11, поэтому прибавляем 1
    const year = date.getFullYear();

    const formattedDate = `${year}/${month}/${day}`;
    dates.push(formattedDate);
  }

  dates.sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime(); //сортировка по числу миллисекунд
  });

  return dates;
};

export const getTodaysDate = () => {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  return formattedDate;
};
