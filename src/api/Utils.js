// для работ с датами/временем
import { lightFormat, addMinutes } from 'date-fns';

/* работа с массивом тикетов */
const cutArray = (arr, numberElemArr) => {
  if (arr.length === 0) {
    return [];
  }
  const resArray = [];
  for (let i = 0; i < numberElemArr; i += 1) {
    resArray[i] = arr[i];
  }
  return resArray;
};

/* расчитали время */
const formatDuration = (duration) => `${Math.floor(duration / 60)} ч ${duration % 60} м`;

/* расчитали дату */
const formatInterval = (date, duration) =>
  `${lightFormat(new Date(date), 'HH:mm')} – ${lightFormat(
    addMinutes(new Date(date), duration),
    'HH:mm'
  )}`;

export { formatDuration, formatInterval, cutArray };
