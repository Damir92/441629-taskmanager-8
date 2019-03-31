import getRandomTask, {filters, colors, colorsCode, tags} from './data.js';
import Task from './task.js';
import TaskEdit from './task-edit';
import Filter from './filter.js';
import {createTagChart, createColorChart} from './stat.js';
import {filterTask} from './utils.js';
import moment from 'moment';
import flatpickr from 'flatpickr';

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
const statInput = statContainer.querySelector(`.statistic__period-input`);

const tagsCtxWrap = statContainer.querySelector(`.statistic__tags-wrap`);
const colorsCtxWrap = statContainer.querySelector(`.statistic__colors-wrap`);
const tagsCtx = statContainer.querySelector(`.statistic__tags`);
const colorsCtx = statContainer.querySelector(`.statistic__colors`);

const createDataForStat = (tasks) => {
  let result = [[], colorsCode, [], [], []];
  colors.forEach((item, index) => {
    result[0][index] = `#` + item;
    result[2][index] = 0;
  });
  tags.forEach((item, index) => {
    result[3][index] = `#` + item;
    result[4][index] = 0;
  });
  for (let item of tasks) {
    if (colors.indexOf(item.color) !== -1) {
      result[2][colors.indexOf(item.color)] += 1;
    }
    for (let tag of item.tags) {
      if (tags.indexOf(tag) !== -1) {
        result[4][tags.indexOf(tag)] += 1;
      }
    }
  }
  return result;
};

const createStat = () => {
  let newTasksArray = [];
  let dateStart = moment().startOf(`week`).format(`YYYY-MM-DD`);
  let dateEnd = moment().endOf(`week`).format(`YYYY-MM-DD`);
  let rengeDate = statInput.value.split(` to `);
  if (rengeDate.length === 2) {
    dateStart = rengeDate[0];
    dateEnd = rengeDate[1];
  }
  for (let item of arrayOfTasks) {
    if (moment(item.dueDate).format(`YYYY-MM-DD`) >= dateStart && moment(item.dueDate).format(`YYYY-MM-DD`) <= dateEnd) {
      newTasksArray.push(item);
    }
  }
  const dataForStat = createDataForStat(newTasksArray);
  createTagChart(tagsCtx, dataForStat);
  createColorChart(colorsCtx, dataForStat);
};

document.querySelector(`.control__btn-wrap`).addEventListener(`change`, () => {
  if (statButton.checked) {
    boardContainer.classList.add(`visually-hidden`);
    statContainer.classList.remove(`visually-hidden`);
    tagsCtxWrap.classList.remove(`visually-hidden`);
    colorsCtxWrap.classList.remove(`visually-hidden`);
    createStat();
  } else {
    boardContainer.classList.remove(`visually-hidden`);
    statContainer.classList.add(`visually-hidden`);
  }
});

statInput.placeholder = `${moment().startOf(`week`).format(`D MMM`)} - ${moment().endOf(`week`).format(`D MMM`)}`;

flatpickr(statInput, {
  altInput: true,
  altFormat: `j F`,
  mode: `range`,
  dateFormat: `Y-m-d`,
  onChange(dates, strDate, instance) {
    strDate = moment(dates[0], `YYYY-MMMM-DD`).format(`D MMM`);
    if (dates[1]) {
      strDate = `${moment(dates[0], `YYYY-MMMM-DD`).format(`D MMM`)} - ${moment(dates[1], `YYYY-MMMM-DD`).format(`D MMM`)}`;
    }
    instance.altInput.value = strDate;
  }
});

statInput.addEventListener(`change`, () => {
  if (statInput.value.split(` to `).length === 2) {
    createStat();
  }
});

let arrayOfTasks = [];

for (let i = 0; i < numOfTasks; i++) {
  arrayOfTasks[i] = getRandomTask(i);
}

makeFilter(arrayOfTasks, filters);

makeBoard(arrayOfTasks);
