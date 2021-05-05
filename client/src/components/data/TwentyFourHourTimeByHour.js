const twentyFourHoursByHour = () => {
  let time = ['00:00'];
  let current = '00:00';
  for (let i = 1; i < 25; i++) {
    let hour = current.split(':')[0];
    if (i < 10) hour = `0${i}`;
    if (i > 9) hour = `${i}`;
    time.push(`${hour}:00`);
  }
  return time;
};

const twentyFourHoursByHourData = twentyFourHoursByHour();

export default twentyFourHoursByHourData;
