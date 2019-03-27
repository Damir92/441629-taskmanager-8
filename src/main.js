import getRandomTask, {filters} from './data.js';
import Task from './task.js';
import TaskEdit from './task-edit';
import Filter from './filter.js';
import {createTagChart, createColorChart} from './stat.js';
import {filterTask} from './utils.js';

const numOfTasks = 20;

const boardTasks = document.querySelector(`.board__tasks`);

const removeTasks = () => {
  boardTasks.querySelectorAll(`article`).forEach((elem) => {
    elem.remove();
  });
};

const getFilterName = () => {
  return document.querySelector(`.main__filter input:checked`).id.replace(`filter__`, ``);
};

const makeFilter = (tasks, filtersArr) => {
  const mainFilter = document.querySelector(`.main__filter`);
  mainFilter.innerHTML = ``;

  for (let filter of filtersArr) {
    const filterComponent = new Filter(filter);
    mainFilter.appendChild(filterComponent.render());

    filterComponent.onFilter = () => {

      let filteredtasks = [];

      for (let item of tasks) {
        if (filterTask(item, filterComponent._name)) {
          filteredtasks.push(item);
        }
      }

      return makeBoard(filteredtasks);
    };
  }
};

const makeBoard = (tasks) => {
  removeTasks();

  for (let item of tasks) {
    const taskComponent = new Task(item);
    const editTaskComponent = new TaskEdit(item);

    boardTasks.appendChild(taskComponent.render());

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      boardTasks.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = (newObject) => {
      item.title = newObject.title;
      item.tags = newObject.tags;
      item.color = newObject.color;
      item.repeatingDays = newObject.repeatingDays;
      item.dueDate = newObject.dueDate;

      taskComponent.update(item);
      if (filterTask(item, getFilterName())) {
        taskComponent.render();
        boardTasks.replaceChild(taskComponent.element, editTaskComponent.element);
      }
      editTaskComponent.unrender();
    };

    editTaskComponent.onDelete = () => {
      editTaskComponent.unrender();
      arrayOfTasks.splice(arrayOfTasks.indexOf(item), 1);
    };
  }
};

const boardContainer = document.querySelector(`.board.container`);
const statContainer = document.querySelector(`.statistic`);
const statButton = document.querySelector(`#control__statistic`);

const tagsCtx = document.querySelector(`.statistic__tags`);
const colorsCtx = document.querySelector(`.statistic__colors`);

// const activateStat = () => {
//   boardContainer.classList.add(`visually-hidden`);
//   statContainer.classList.remove(`visually-hidden`);
//   createTagChart(tagsCtx);
//   createColorChart(colorsCtx);
//   console.log(tagsCtx);
// }

document.querySelector(`.control__btn-wrap`).addEventListener(`change`, () => {
  if (statButton.checked) {
    boardContainer.classList.add(`visually-hidden`);
    statContainer.classList.remove(`visually-hidden`);
    createTagChart(tagsCtx);
    createColorChart(colorsCtx);
  } else {
    boardContainer.classList.remove(`visually-hidden`);
    statContainer.classList.add(`visually-hidden`);
    // createTagChart(tagsCtx);
    // createColorChart(colorsCtx);
  }
});

let arrayOfTasks = [];

for (let i = 0; i < numOfTasks; i++) {
  arrayOfTasks[i] = getRandomTask(i);
}

makeFilter(arrayOfTasks, filters);

makeBoard(arrayOfTasks);
