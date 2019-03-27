import moment from 'moment';

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const filterTask = (task, filter) => {
  switch (filter) {
    case `all`:
      return true;

    case `overdue`:
      return task.dueDate < Date.now();

    case `today`:
      return moment(task.dueDate).format(`D MMMM`) === moment(Date.now()).format(`D MMMM`);

    case `repeating`:
      return [...Object.entries(task.repeatingDays)].some((rec) => rec[1]);

    case `favourites`:
      return task.isFavourite;

    default:
      return true;
  }
};
