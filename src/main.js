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
  for (let i = 1; i <= count; i++) {
    template += makeTask(i);
  }

  boardTasks.insertAdjacentHTML(`beforeEnd`, template);
};

mainFilter.querySelectorAll(`.filter__input`).forEach((elem, index) => {
  elem.addEventListener(`click`, function () {
    makeBoard(filters[index]);
  });
});

makeBoard(filters[0]);
