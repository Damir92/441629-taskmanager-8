import data from './data.js';
import {mainFilter, filters} from './make-filter.js';
import makeTask from './make-task.js';

const boardTasks = document.querySelector(`.board__tasks`);

const removeTasks = () => {
  boardTasks.querySelectorAll(`article`).forEach((elem) => {
    elem.remove();
  });
};

const makeBoard = (count) => {
  removeTasks();
  let template = ``;
  let arrayOfTasks = [];

  for (let i = 0; i < count; i++) {
    arrayOfTasks[i] = data();
  }

  let index = 1;
  for (let item of arrayOfTasks) {
    template += makeTask(item, index++);
  }

  boardTasks.insertAdjacentHTML(`beforeEnd`, template);
};

mainFilter.querySelectorAll(`.filter__input`).forEach((elem, index) => {
  elem.addEventListener(`click`, function () {
    makeBoard(filters[index]);
  });
});

makeBoard(filters[0]);
