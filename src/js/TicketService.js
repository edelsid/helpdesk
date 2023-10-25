export default class TicketService {
  static list(callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
      callback(xhr.response);
    };

    xhr.open('GET', 'https://helpdesk-lwys.onrender.com?method=allTickets');
    xhr.send();
  }

  static get(id, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.response.error) {
        const err = xhr.response.error;
        callback(err, xhr.response);
      }
      callback(null, xhr.response);
    };

    xhr.open('GET', `https://helpdesk-lwys.onrender.com?method=ticketById&id=${id}`);
    xhr.send();
  }

  static create(data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.response.error) {
        const err = xhr.response.error;
        callback(err, xhr.response);
      }
      callback(null, xhr.response);
    };

    xhr.open('POST', 'https://helpdesk-lwys.onrender.com?method=createTicket');
    xhr.send(data);
  }

  static update(id, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.response.error) {
        const err = xhr.response.error;
        callback(err, xhr.response);
      }
      callback(null, xhr.response);
    };

    xhr.open('POST', `hhttps://helpdesk-lwys.onrender.com?method=updateById&id=${id}`);
    xhr.send(data);
  }

  static delete(id, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.response.error) {
        const err = xhr.response.error;
        callback(err, xhr.status);
      }
      callback(null, xhr.status);
    };

    xhr.open('GET', `https://helpdesk-lwys.onrender.com?method=deleteById&id=${id}`);
    xhr.send();
  }
}
