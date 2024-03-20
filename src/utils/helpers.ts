/**
 * Преобразовать значение времени в секундах в формат mm:ss
 */
const convertToTimerFmt = (time: number) => {
  const mins = Math.floor(time / 60);
  const seconds = time % 60;
  let result = '';

  if (mins < 10) {
    result += `0${mins}`;
  } else {
    result += mins;
  }

  result += ':';

  if (seconds < 10) {
    result += `0${seconds}`;
  } else {
    result += seconds;
  }

  return result;
};

export default convertToTimerFmt;
