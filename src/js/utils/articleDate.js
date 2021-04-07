const months = ['Января','Февраля','Марта',
'Апреля','Мая','Июня',
'Июля','Августа','Сентября',
'Октября', 'Ноября','Декабря'];

export default function articleDate (value) {
  const date = new Date(value);
  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
};