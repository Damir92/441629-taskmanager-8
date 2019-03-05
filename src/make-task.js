const months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

const makeTags = (tags) => {
  let templateOfTags = ``;

  for (let tag of tags) {
    templateOfTags += `<span class="card__hashtag-inner">
      <input type="hidden" name="hashtag" value="repeat" class="card__hashtag-hidden-input"/>
      <button type="button" class="card__hashtag-name">#${tag}</button>
      <button type="button" class="card__hashtag-delete">delete</button>
    </span>`;
  }

  return templateOfTags;
};

const makeDate = (date) => {
  const dayOfMonth = date.getDate() < 10 ? `0` + date.getDate() : date.getDate();
  return dayOfMonth + ` ` + months[date.getMonth()];
};

const makeTime = (date) => {
  const hours = date.getHours() < 10 ? `0` + date.getHours() : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0` + date.getMinutes() : date.getMinutes();
  return hours + `:` + minutes;
};

const testDeadline = (date) => {
  return Date.now() < Date.parse(date);
};

export default (data, number) => `<article class="card card--${data.color} card--repeat ${testDeadline(data.dueDate) ? `` : `card--deadline`}">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                  <button type="button" class="card__btn card__btn--archive">
                    archive
                  </button>
                  <button type="button" class="card__btn card__btn--favorites
                  card__btn--${data.isFavorite ? `` : `disabled`}"
                  >
                    favorites
                  </button>
                </div>

                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <label>
                    <textarea class="card__text" placeholder="Start typing your text here..." name="text">${data.title}</textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">no</span>
                      </button>

                      <fieldset class="card__date-deadline" ${data.dueDate ? `` : `disabled`}>
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__date"
                            type="text"
                            placeholder="${makeDate(data.dueDate)}"
                            name="date"
                          />
                        </label>
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__time"
                            type="text"
                            placeholder="${makeTime(data.dueDate)}"
                            name="time"
                          />
                        </label>
                      </fieldset>

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">no</span>
                      </button>

                      <fieldset class="card__repeat-days" disabled>
                        <div class="card__repeat-days-inner">
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-mo-${number}"
                            name="repeat"
                            value="mo"
                            ${data.repeatingDays.mo ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-mo-${number}">mo</label>
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-tu-${number}"
                            name="repeat"
                            value="tu"
                            ${data.repeatingDays.tu ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-tu-${number}">tu</label>
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-we-${number}"
                            name="repeat"
                            value="we"
                            ${data.repeatingDays.we ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-we-${number}">we</label>
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-th-${number}"
                            name="repeat"
                            value="th"
                            ${data.repeatingDays.th ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-th-${number}">th</label>
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-fr-${number}"
                            name="repeat"
                            value="fr"
                            ${data.repeatingDays.fr ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-fr-${number}">fr</label>
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-sa-${number}"
                            name="repeat"
                            value="sa"
                            ${data.repeatingDays.sa ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-sa-${number}">sa</label>
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-su-${number}"
                            name="repeat"
                            value="su"
                            ${data.repeatingDays.su ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-su-${number}">su</label>
                        </div>
                      </fieldset>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${makeTags(data.tags)}
                      </div>

                      <label>
                        <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here"/>
                      </label>
                    </div>
                  </div>

                  <label class="card__img-wrap ${data.picture ? `` : `card__img-wrap--empty`}">
                    <input type="file" class="card__img-input visually-hidden" name="img"/>
                    <img
                      src="${data.picture}"
                      alt="task picture"
                      class="card__img"
                    />
                  </label>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                      <input
                        type="radio"
                        id="color-black-${number}"
                        class="card__color-input card__color-input--black visually-hidden"
                        name="color"
                        value="black"
                      />
                      <label
                        for="color-black-${number}"
                        class="card__color card__color--black"
                        >black</label
                      >
                      <input
                        type="radio"
                        id="color-yellow-${number}"
                        class="card__color-input card__color-input--yellow visually-hidden"
                        name="color"
                        value="yellow"
                      />
                      <label
                        for="color-yellow-${number}"
                        class="card__color card__color--yellow"
                        >yellow</label
                      >
                      <input
                        type="radio"
                        id="color-blue-${number}"
                        class="card__color-input card__color-input--blue visually-hidden"
                        name="color"
                        value="blue"
                      />
                      <label
                        for="color-blue-${number}"
                        class="card__color card__color--blue"
                        >blue</label
                      >
                      <input
                        type="radio"
                        id="color-green-${number}"
                        class="card__color-input card__color-input--green visually-hidden"
                        name="color"
                        value="green"
                      />
                      <label
                        for="color-green-${number}"
                        class="card__color card__color--green"
                        >green</label
                      >
                      <input
                        type="radio"
                        id="color-pink-${number}"
                        class="card__color-input card__color-input--pink visually-hidden"
                        name="color"
                        value="pink"
                        checked
                      />
                      <label
                        for="color-pink-${number}"
                        class="card__color card__color--pink"
                        >pink</label
                      >
                    </div>
                  </div>
                </div>

                <div class="card__status-btns">
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
            </form>
          </article>`;
