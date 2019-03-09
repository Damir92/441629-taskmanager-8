import getRandomTask from './data.js';
import {mainFilter, filters} from './make-filter.js';
import Task from './task.js';
import TaskEdit from './task-edit';

const boardTasks = document.querySelector(`.board__tasks`);

const removeTasks = () => {
  boardTasks.querySelectorAll(`article`).forEach((elem) => {
    elem.remove();
  });
};

const makeBoard = (count) => {
  removeTasks();
  let arrayOfTasks = [];

  for (let i = 0; i < count; i++) {
    arrayOfTasks[i] = getRandomTask();
  }

  // let index = 1;
  for (let item of arrayOfTasks) {
    const taskComponent = new Task(item);
    const editTaskComponent = new TaskEdit(item);

    boardTasks.appendChild(taskComponent.render());

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      boardTasks.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = () => {
      taskComponent.render();
      boardTasks.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };
  }
};

mainFilter.querySelectorAll(`.filter__input`).forEach((elem, index) => {
  elem.addEventListener(`click`, function () {
    makeBoard(filters[index]);
  });
});

makeBoard(filters[0]);
