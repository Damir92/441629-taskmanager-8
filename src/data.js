const titles = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const tags = new Set([`homework`, `theory`, `practice`, `intensive`, `keks`]);
const colors = [`black`, `yellow`, `blue`, `green`, `pink`];
const days = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false
};
export const filters = [
  {name: `all`, checked: true},
  {name: `overdue`, checked: false},
  {name: `today`, checked: false},
  {name: `favorites`, checked: false},
  {name: `repeating`, checked: false},
  {name: `tags`, checked: false},
  {name: `archive`, checked: false}
];

const getRandom = (length) => Math.floor(Math.random() * length);

const getRandomElement = (arr) => arr[getRandom(arr.length)];

const getRandomDate = () => Date.now() + (Math.random() < 0.5 ? 1 : -1) * getRandom(7 * 24 * 60 * 60 * 1000);

const getTags = (tag) => {
  let setOfTags = new Set();

  for (let index = 0; index < 3; index++) {
    setOfTags.add([...tag][getRandom(tag.size)]);
  }

  return setOfTags;
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

export default (index) => ({
  title: getRandomElement(titles),

  dueDate: new Date(getRandomDate()),

  tags: getTags(tags),

  picture: `//picsum.photos/100/100?r=${Math.random()}`,

  color: getRandomElement(colors),

  repeatingDays: createDays(days),

  isFavorite: !!getRandom(2),

  isDone: !!getRandom(2),

  index
});
