/* eslint-disable no-console */
/* eslint-disable no-alert */

import TicketService from './TicketService';
import TicketForm from './TicketForm';
import TicketView from './TicketView';

export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = new TicketService();

    this.onClick = this.onClick.bind(this);

    this.ticketArea = document.querySelector('.tickets');
  }

  init() {
    this.ticketArea.innerHTML = '';
    const callback = (response) => {
      if (response) {
        const allTickets = JSON.parse(response);
        allTickets.forEach((entry) => {
          this.renderTicket(entry);
        });
      }
    };
    TicketService.list(callback);
  }

  onClick(e) {
    if (e.target.classList.contains('add_ticket_btn')) {
      this.formAdd('create');
    } else if (e.target.classList.contains('redact')) {
      this.formAdd('redact', e.target.closest('.ticket').id);
    } else if (e.target.classList.contains('remove')) {
      this.formAdd('remove', e.target.closest('.ticket').id);
    } else if (e.target.classList.contains('info')
    || e.target.classList.contains('standard')) {
      HelpDesk.deskCheck(e.target.closest('.ticket'), e.target.closest('.ticket').id);
    } else if (e.target.classList.contains('ticket')) {
      HelpDesk.deskCheck(e.target, e.target.id);
    } else if (e.target.classList.contains('checkmark')
    || e.target.classList.contains('check')) {
      this.statusFlip(e.target.closest('.ticket').id);
    }
  }

  statusFlip(id) {
    const callback = (error, response) => {
      if (error) {
        console.log(error);
      }
      if (response) {
        const found = JSON.parse(response);

        const data = {
          status: !found.status,
        };
        this.updateFormSend(id, data);
      }
    };
    TicketService.get(id, callback);
  }

  formAdd(type, id) {
    const newForm = new TicketForm();
    newForm[type]();
    this.container.appendChild(newForm.formElement);

    newForm.formElement.addEventListener('click', (e) => this.formClick(e, id, type));
  }

  formClick(e, id, type) {
    e.preventDefault();
    if (type !== 'remove' && e.target.classList.contains('confirm')) {
      const data = {
        name: e.target.parentNode.parentNode.querySelector('.short').value,
        description: e.target.parentNode.parentNode.querySelector('.long').value,
      };
      if (data.name === '') {
        alert('Введите название тикета');
        return;
      }

      if (type === 'create') {
        this.createFormSend(data);
      } else if (type === 'redact') {
        this.updateFormSend(id, data);
      }
    } else if (type === 'remove' && e.target.classList.contains('confirm')) {
      this.deleteFormSend(id);
    } else if (e.target.classList.contains('deny')) {
      HelpDesk.formRemove();
    }
  }

  createFormSend(data) {
    const callback = (error, response) => {
      if (error) {
        console.log(error);
      }
      if (response) {
        const newTicket = JSON.parse(response);
        this.renderTicket(newTicket);
        HelpDesk.formRemove();
      }
    };
    TicketService.create(JSON.stringify(data), callback);
  }

  updateFormSend(id, data) {
    const callback = (error, response) => {
      if (error) {
        console.log(error);
      }
      if (response) {
        this.init();
        if (document.querySelector('.form')) {
          HelpDesk.formRemove();
        }
      }
    };
    TicketService.update(id, JSON.stringify(data), callback);
  }

  deleteFormSend(id) {
    const callback = (error, response) => {
      if (error) {
        console.log(error);
      }
      if (response === 204) {
        console.log('done');
        this.init();
        HelpDesk.formRemove();
      }
    };
    TicketService.delete(id, callback);
  }

  static formRemove() {
    const form = document.querySelector('.form');
    form.remove();
  }

  renderTicket(entry) {
    const ticket = new TicketView(entry);
    const ticketElement = ticket.generateTicket();
    this.ticketArea.appendChild(ticketElement);
  }

  static deskCheck(target, id) {
    const fullDesk = target.querySelector('.fullDesk');
    if (fullDesk) {
      fullDesk.remove();
      return;
    }
    HelpDesk.fullDesk(target, id);
  }

  static fullDesk(target, id) {
    const callback = (error, response) => {
      if (error) {
        console.log(error);
      }
      if (response) {
        const found = JSON.parse(response);
        const ticket = new TicketView(found);
        const desk = ticket.addDesk();

        desk.style.left = `${target.querySelector('.short_desk').offsetLeft}px`;
        target.appendChild(desk);
      }
    };
    TicketService.get(id, callback);
  }
}
