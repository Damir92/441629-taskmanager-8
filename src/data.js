const titles = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const tags = new Set([`homework`, `theory`, `practice`, `intensive`, `keks`]);
const colors = [`black`, `yellow`, `blue`, `green`, `pink`];
const days = {
  mo: true,
  tu: false,
  we: true,
  th: false,
  fr: true,
  sa: false,
  su: true
};

const getRandom = (length) => Math.floor(Math.random() * length);

const getRandomElement = (arr) => arr[getRandom(arr.length)];

const getRandomDate = () => Date.now() + (Math.random() < 0.5 ? 1 : -1) * getRandom(7) * 24 * 60 * 60 * 1000;

const getTags = (arr) => {
  let newArray = [...arr];

  newArray.forEach((elem, index) => {
    const newIndex = getRandom(index + 1);
    const element = elem;

    newArray[index] = newArray[newIndex];
    newArray[newIndex] = element;
  });

  return newArray.slice(0, getRandom(newArray.length));
};

const createDays = (week) => {
  let newDays = {};

  for (let key in week) {
    if (week.hasOwnProperty(key)) {
      newDays[key] = !!getRandom(2);
    }
  }

  return newDays;
};

export default () => ({
  title: getRandomElement(titles),

  dueDate: getRandomDate(),

  tags: getTags(tags),

  picture: `//picsum.photos/100/100?r=${Math.random()}`,

  color: getRandomElement(colors),

  repeatingDays: createDays(days),

  isFavorite: !!getRandom(2),

  isDone: !!getRandom(2)
});
