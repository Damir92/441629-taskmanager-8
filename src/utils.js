const months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const makeDate = (date) => {
  const dayOfMonth = date.getDate() < 10 ? `0` + date.getDate() : date.getDate();
  return dayOfMonth + ` ` + months[date.getMonth()];
};

export const makeTime = (date) => {
  const hours = date.getHours() < 10 ? `0` + date.getHours() : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0` + date.getMinutes() : date.getMinutes();
  return hours + `:` + minutes;
};
