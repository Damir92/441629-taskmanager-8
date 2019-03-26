const FILTERS_NAME = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];
const RANDOM_MAX = 10;

const mainFilter = document.querySelector(`.main__filter`);

const makeFilter = (name, count, isChecked = false) => `<input
          type="radio"
          id="filter__${name}"
          class="filter__input visually-hidden"
          name="filter"
          ${ isChecked ? `checked` : `` }
        />
        <label for="filter__${name}" class="filter__label">
          ${name.toUpperCase()} <span class="filter__${name}-count"></span></label
        >`;

const makeFilterCount = (count) => {
  let filterArray = [0];
  for (let i = 1; i < FILTERS_NAME.length; i++) {
    filterArray[i] = Math.floor(Math.random() * count);
    if (i < FILTERS_NAME.length - 1) {
      filterArray[0] += filterArray[i];
    }
  }
  return filterArray;
};

const filters = makeFilterCount(RANDOM_MAX);

FILTERS_NAME.forEach((elem, index) => {
  mainFilter.insertAdjacentHTML(`beforeEnd`, makeFilter(elem, filters[index], elem === `all`));
});

export {mainFilter, filters};
