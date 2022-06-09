import dayjs from 'dayjs';

export const nowDate = dayjs(new Date()).format('YYYY-MM-DD HH:mm');

console.log(dayjs(new Date()).format('YYYY-MM-DD HH:mm'));
console.log(dayjs(new Date()).diff('2022-06-10 01:08', 'h'));
