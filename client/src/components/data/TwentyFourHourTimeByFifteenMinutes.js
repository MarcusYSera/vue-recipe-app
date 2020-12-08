const twentyFourHours = () => {
  // 00:00 start of day & continuation from 24:00 night before - 24:00 end of day
  // 1 AM - 11 PM & 12AM is the border/first dash and last dash/last border
  let time = ['00:00'];
  let current = '00:00';
  for (let i = 0; i < 95; i++) {
    let hour = current.split(':')[0];
    let minute = current.split(':')[1];
    if (minute === '45') {
      minute = '00';
      hour = addHour(hour);
      current = [hour, minute].join(':');
      time.push(current);
      continue;
    }
    minute = addFifteen(minute);
    current = [hour, minute].join(':');
    time.push(current);
  }
  return time;
};

const addFifteen = x => {
  let answer = (parseInt(x) + 15).toString();
  return answer;
};
const addHour = x => {
  let answer = parseInt(x) + 1;
  if (answer > 9) {
    answer = answer.toString();
  } else {
    answer = ['0', answer.toString()].join('');
  }
  return answer;
};

const twentyFourData = twentyFourHours();

export default twentyFourData;
