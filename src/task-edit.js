import Component from './component.js';
import flatpickr from 'flatpickr';
import moment from 'moment';

export default class TaskEdit extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._tags = data.tags;
    this._picture = data.picture;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;
    this._isFavourite = data.isFavorite;
    this._id = data.index;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);

    this._onSubmit = null;
    this._onDelete = null;

    this._state.isDate = this._dueDate;
    this._state.isRepeated = Object.values(this._repeatingDays).some((it) => it === true);

    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);

    this._flatpickrDate = null;
    this._flatpickrTime = null;
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };

    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (taskEditMapper[property]) {
        if (property === `date` && value === ``) {
          taskEditMapper[property](this._dueDate);
        } else {
          taskEditMapper[property](value);
        }
      }

    }

    return entry;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();

    if (typeof this._onDelete === `function`) {
      this._onDelete();
    }
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _isDeadline() {
    return Date.now() < Date.parse(this._dueDate);
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  get template() {
    return `
    <article class="card card--edit
      card--${this._color}
      ${this._state.isRepeated && `card--repeat`}
      ${this._isDeadline() ? `` : `card--deadline`}"
    >
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">edit</button>
            <button type="button" class="card__btn card__btn--archive">archive</button>
            <button type="button" class="card__btn card__btn--favorites card__btn--${this._isFavourite ? `` : `disabled`}">favorites</button>
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
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__date-deadline" ${!this._state.isDate && `disabled`}>
                  <label class="card__input-deadline-wrap">
                    <input class="card__date" type="text" placeholder="${moment(this._dueDate).format(`D MMMM`)}" name="date" />
                  </label>

                  <label class="card__input-deadline-wrap">
                    <input class="card__time" type="text" placeholder="${moment(this._dueDate).format(`h:mm a`)}" name="time" />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat: <span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days" ${!this._state.isRepeated && `disabled`}>
                  <div class="card__repeat-days-inner">
                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-mo-${this._id}" name="repeat" value="mo" ${this._repeatingDays.mo && `checked`} />
                    <label class="card__repeat-day" for="repeat-mo-${this._id}">mo</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-tu-${this._id}" name="repeat" value="tu" ${this._repeatingDays.tu && `checked`} />
                    <label class="card__repeat-day" for="repeat-tu-${this._id}">tu</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-we-${this._id}" name="repeat" value="we" ${this._repeatingDays.we && `checked`} />
                    <label class="card__repeat-day" for="repeat-we-${this._id}" >w</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-th-${this._id}" name="repeat" value="th" ${this._repeatingDays.th && `checked`} />
                    <label class="card__repeat-day" for="repeat-th-${this._id}">th</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-fr-${this._id}" name="repeat" value="fr" ${this._repeatingDays.fr && `checked`} />
                    <label class="card__repeat-day" for="repeat-fr-${this._id}" >fr</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-sa-${this._id}" name="repeat" value="sa" ${this._repeatingDays.sa && `checked`} />
                    <label class="card__repeat-day" for="repeat-sa-${this._id}">sa</label>

                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-su-${this._id}" name="repeat" value="su" ${this._repeatingDays.su && `checked`} />
                    <label class="card__repeat-day" for="repeat-su-${this._id}" >su</label>
                  </div>
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

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input type="radio" id="color-black-${this._id}" class="card__color-input card__color-input--black visually-hidden" name="color" value="black" ${this._color === `black` && `checked`} />
                <label for="color-black-${this._id}" class="card__color card__color--black">black</label>

                <input type="radio" id="color-yellow-${this._id}" class="card__color-input card__color-input--yellow visually-hidden" name="color" value="yellow" ${this._color === `yellow` && `checked`} />
                <label for="color-yellow-${this._id}" class="card__color card__color--yellow">yellow</label>

                <input type="radio" id="color-blue-${this._id}" class="card__color-input card__color-input--blue visually-hidden" name="color" value="blue" ${this._color === `blue` && `checked`} />
                <label for="color-blue-${this._id}" class="card__color card__color--blue">blue</label>

                <input type="radio" id="color-green-${this._id}" class="card__color-input card__color-input--green visually-hidden" name="color" value="green" ${this._color === `green` && `checked`} />
                <label for="color-green-${this._id}" class="card__color card__color--green">green</label>

                <input type="radio" id="color-pink-${this._id}" class="card__color-input card__color-input--pink visually-hidden" name="color" value="pink" ${this._color === `pink` && `checked`} />
                <label for="color-pink-${this._id}" class="card__color card__color--pink">pink</label>
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>

        </div>
      </form>
    </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.card__form`)
        .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__delete`)
        .addEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
        .addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
        .addEventListener(`click`, this._onChangeRepeated);

    if (this._state.isDate) {
      this._flatpickrDate = flatpickr(this._element.querySelector(`.card__date`), {altInput: true, altFormat: `j F`});
      this._flatpickrTime = flatpickr(this._element.querySelector(`.card__time`), {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i K`, dateFormat: `h:i K`});
    }
  }

  unbind() {
    this._element.querySelector(`.card__form`)
        .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__delete`)
        .removeEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
        .removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
        .removeEventListener(`click`, this._onChangeRepeated);

    if (this._flatpickrDate) {
      this._flatpickrDate.destroy();
      this._flatpickrDate = null;
    }
    if (this._flatpickrTime) {
      this._flatpickrTime.destroy();
      this._flatpickrTime = null;
    }
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => {
        target.title = value;
      },
      color: (value) => {
        target.color = value;
      },
      repeat: (value) => {
        target.repeatingDays[value] = true;
      },
      date: (value) => {
        target.dueDate = new Date(value);
      }
    };
  }
}
