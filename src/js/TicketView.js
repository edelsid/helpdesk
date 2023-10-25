import Ticket from './Ticket';

export default class TicketView {
  constructor(entry) {
    this.ticket = new Ticket(entry);
  }

  generateTicket() {
    const date = this.getDate();
    const ticket = document.createElement('li');
    ticket.className = 'ticket';
    ticket.id = this.ticket.id;

    ticket.innerHTML = `
    <div class='standard'>
      <button class="btn_dec checkmark" type="button">
        <span class="check"></span>
      </button>
      <text class="info short_desk">${this.ticket.name}</text>
      <text class="info date">${date}</text>
      <div class="ticket_btns">
        <span class="btn_dec icon redact"></span>
        <span class="btn_dec icon remove"></span>
      </div>
    </div>`;

    const check = ticket.querySelector('.check');
    if (this.ticket.status) {
      check.style.display = 'block';
    }

    return ticket;
  }

  addDesk() {
    const fullDesk = document.createElement('text');
    fullDesk.className = 'fullDesk';
    fullDesk.classList.add('info');
    fullDesk.innerText = this.ticket.description;
    return fullDesk;
  }

  getDate() {
    const rawDate = new Date(this.ticket.created);
    const yy = rawDate.getFullYear().toString().slice(-2);
    const mm = TicketView.insertZeroes(rawDate.getMonth() + 1);
    const dd = TicketView.insertZeroes(rawDate.getDate());
    const hh = TicketView.insertZeroes(rawDate.getHours());
    const min = TicketView.insertZeroes(rawDate.getMinutes());

    const date = `${dd}.${mm}.${yy} ${hh}:${min}`;
    return date;
  }

  static insertZeroes(value) {
    let newValue;
    if (value < 10) {
      newValue = `0${value}`;
      return newValue;
    }
    return value;
  }
}
