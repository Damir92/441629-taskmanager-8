import Component from './component.js';
import {makeDate, makeTime} from './utils.js';

export default class Task extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._tags = data.tags;
    this._picture = data.picture;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;
    this._isFavourite = data.isFavourite;
    this._id = data.index;

    this._onEdit = null;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _isDeadline() {
    return Date.now() < Date.parse(this._dueDate);
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `
    <article class="card
      card--${this._color}
      ${this._isRepeated() ? `card--repeat` : ``}
      ${this._isDeadline() ? `` : `card--deadline`}"
    >
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">edit</button>
          <button type="button" class="card__btn card__btn--archive">archive</button>
          <button type="button" class="card__btn card__btn--favorites card__btn--${this._isFavorite ? `` : `disabled`}">favorites</button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <fieldset class="card__date-deadline" ${this._dueDate ? `` : `disabled`}>
                <label class="card__input-deadline-wrap">
                  <input class="card__date" type="text" placeholder="${makeDate(this._dueDate)}" name="date" />
                </label>

                <label class="card__input-deadline-wrap">
                  <input class="card__time" type="text" placeholder="${makeTime(this._dueDate)}" name="time" />
                </label>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${(Array.from(this._tags).map((tag) => (`
                  <span class="card__hashtag-inner">
                    <input type="hidden" name="hashtag" value="${tag}" class="card__hashtag-hidden-input" />
                    <button type="button" class="card__hashtag-name">#${tag}</button>
                    <button type="button" class="card__hashtag-delete">delete</button>
                  </span>`.trim()))).join(``)}
              </div>

              <label>
                <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here" />
              </label>
            </div>
          </div>

          <label class="card__img-wrap ${this._picture ? `` : `card__img-wrap--empty`}">
            <input type="file" class="card__img-input visually-hidden" name="img" />
            <img
              src="${this._picture}"
              alt="task picture"
              class="card__img"
            />
          </label>

        </div>

      </div>

    </article>`.trim();
  }

  bind() {
    this._onEditButtonClick = () => {
      return typeof this._onEdit === `function` && this._onEdit();
    };

    this._element.querySelector(`.card__btn--edit`)
        .addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`)
        .removeEventListener(`click`, this._onEditButtonClick);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
  }
}
