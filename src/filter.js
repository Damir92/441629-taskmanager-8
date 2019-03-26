import Component from './component.js';

export default class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._isChecked = data.checked;

    this._onFilterClick = this._onFilterClick.bind(this);

    this._onFilter = null;
  }

  _onFilterClick(evt) {
    evt.preventDefault();

    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `
    <div>
      <input type="radio" id="filter__${this._name}" class="filter__input visually-hidden" name="filter"
        ${this._isChecked ? `checked` : ``} />
      <label for="filter__${this._name}" class="filter__label">
        ${this._name.toUpperCase()} <span class="filter__${this._name}-count"></span>
      </label>
    </div>`.trim();
  }

  bind() {
    this._element.querySelector(`.filter__input`).addEventListener(`change`, this._onFilterClick);
  }

  unbind() {
    this._element.querySelector(`.filter__input`).removeEventListener(`change`, this._onFilterClick);
  }

}
