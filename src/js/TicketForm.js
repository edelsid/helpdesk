export default class TicketForm {
  constructor() {
    this.formElement = document.createElement('div');
    this.formElement.className = 'form';
  }

  static standart(header) {
    const form = `
    <h1 class="form_name">${header}</h1>
    <form class="form_group" ">
      <text class="area_header">Краткое описание</text>
      <textarea class="area short"></textarea>
      <text class="area_header">Подробное описание</text>
      <textarea class="area long"></textarea>
      <div class="form_btns">
        <button class="btn deny">Отмена</button>
        <button type=submit class="btn confirm">Ок</button>
      </div>
    </form>`;
    return form;
  }

  create() {
    this.formElement.innerHTML = TicketForm.standart('Добавить тикет');
    this.formElement.classList.add('add_ticket_form');
  }

  redact() {
    this.formElement.innerHTML = TicketForm.standart('Изменить тикет');
    this.formElement.classList.add('redact_ticket_form');
  }

  remove() {
    this.formElement.innerHTML = `
    <h1 class="form_name">Удалить тикет</h1>
    <form class="form_group">
      <text class="area_header">Вы уверены, что хотите удалить тикет? Это действие необратимо.</text>
      <div class="form_btns">
        <button class="btn deny">Отмена</button>
        <button class="btn confirm">Ок</button>
      </div>
    </form>`;
    this.formElement.classList.add('remove_ticket_form');
  }
}
