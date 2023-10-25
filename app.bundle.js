(()=>{"use strict";class e{static list(e){const t=new XMLHttpRequest;t.onreadystatechange=()=>{4===t.readyState&&e(t.response)},t.open("GET","https://helpdesk-lwys.onrender.com?method=allTickets"),t.send()}static get(e,t){const s=new XMLHttpRequest;s.onreadystatechange=()=>{if(4===s.readyState){if(s.response.error){const e=s.response.error;t(e,s.response)}t(null,s.response)}},s.open("GET",`https://helpdesk-lwys.onrender.com?method=ticketById&id=${e}`),s.send()}static create(e,t){const s=new XMLHttpRequest;s.onreadystatechange=()=>{if(4===s.readyState){if(s.response.error){const e=s.response.error;t(e,s.response)}t(null,s.response)}},s.open("POST","https://helpdesk-lwys.onrender.com?method=createTicket"),s.send(e)}static update(e,t,s){const n=new XMLHttpRequest;n.onreadystatechange=()=>{if(4===n.readyState){if(n.response.error){const e=n.response.error;s(e,n.response)}s(null,n.response)}},n.open("POST",`https://helpdesk-lwys.onrender.com?method=updateById&id=${e}`),n.send(t)}static delete(e,t){const s=new XMLHttpRequest;s.onreadystatechange=()=>{if(4===s.readyState){if(s.response.error){const e=s.response.error;t(e,s.status)}t(null,s.status)}},s.open("GET",`https://helpdesk-lwys.onrender.com?method=deleteById&id=${e}`),s.send()}}class t{constructor(){this.formElement=document.createElement("div"),this.formElement.className="form"}static standart(e){return`\n    <h1 class="form_name">${e}</h1>\n    <form class="form_group" ">\n      <text class="area_header">Краткое описание</text>\n      <textarea class="area short"></textarea>\n      <text class="area_header">Подробное описание</text>\n      <textarea class="area long"></textarea>\n      <div class="form_btns">\n        <button class="btn deny">Отмена</button>\n        <button type=submit class="btn confirm">Ок</button>\n      </div>\n    </form>`}create(){this.formElement.innerHTML=t.standart("Добавить тикет"),this.formElement.classList.add("add_ticket_form")}redact(){this.formElement.innerHTML=t.standart("Изменить тикет"),this.formElement.classList.add("redact_ticket_form")}remove(){this.formElement.innerHTML='\n    <h1 class="form_name">Удалить тикет</h1>\n    <form class="form_group">\n      <text class="area_header">Вы уверены, что хотите удалить тикет? Это действие необратимо.</text>\n      <div class="form_btns">\n        <button class="btn deny">Отмена</button>\n        <button class="btn confirm">Ок</button>\n      </div>\n    </form>',this.formElement.classList.add("remove_ticket_form")}}class s{constructor({id:e,name:t,description:s,status:n,created:r}){this.id=e,this.name=t,this.description=s,this.status=n,this.created=r}}class n{constructor(e){this.ticket=new s(e)}generateTicket(){const e=this.getDate(),t=document.createElement("li");t.className="ticket",t.id=this.ticket.id,t.innerHTML=`\n    <div class='standard'>\n      <button class="btn_dec checkmark" type="button">\n        <span class="check"></span>\n      </button>\n      <text class="info short_desk">${this.ticket.name}</text>\n      <text class="info date">${e}</text>\n      <div class="ticket_btns">\n        <span class="btn_dec icon redact"></span>\n        <span class="btn_dec icon remove"></span>\n      </div>\n    </div>`;const s=t.querySelector(".check");return this.ticket.status&&(s.style.display="block"),t}addDesk(){const e=document.createElement("text");return e.className="fullDesk",e.classList.add("info"),e.innerText=this.ticket.description,e}getDate(){const e=new Date(this.ticket.created),t=e.getFullYear().toString().slice(-2),s=n.insertZeroes(e.getMonth()+1);return`${n.insertZeroes(e.getDate())}.${s}.${t} ${n.insertZeroes(e.getHours())}:${n.insertZeroes(e.getMinutes())}`}static insertZeroes(e){let t;return e<10?(t=`0${e}`,t):e}}class r{constructor(t){if(!(t instanceof HTMLElement))throw new Error("This is not HTML element!");this.container=t,this.ticketService=new e,this.onClick=this.onClick.bind(this),this.ticketArea=document.querySelector(".tickets")}init(){this.ticketArea.innerHTML="",e.list((e=>{e&&JSON.parse(e).forEach((e=>{this.renderTicket(e)}))}))}onClick(e){e.target.classList.contains("add_ticket_btn")?this.formAdd("create"):e.target.classList.contains("redact")?this.formAdd("redact",e.target.closest(".ticket").id):e.target.classList.contains("remove")?this.formAdd("remove",e.target.closest(".ticket").id):e.target.classList.contains("info")||e.target.classList.contains("standard")?r.deskCheck(e.target.closest(".ticket"),e.target.closest(".ticket").id):e.target.classList.contains("ticket")?r.deskCheck(e.target,e.target.id):(e.target.classList.contains("checkmark")||e.target.classList.contains("check"))&&this.statusFlip(e.target.closest(".ticket").id)}statusFlip(t){e.get(t,((e,s)=>{if(e&&console.log(e),s){const e={status:!JSON.parse(s).status};this.updateFormSend(t,e)}}))}formAdd(e,s){const n=new t;n[e](),this.container.appendChild(n.formElement),n.formElement.addEventListener("click",(t=>this.formClick(t,s,e)))}formClick(e,t,s){if(e.preventDefault(),"remove"!==s&&e.target.classList.contains("confirm")){const n={name:e.target.parentNode.parentNode.querySelector(".short").value,description:e.target.parentNode.parentNode.querySelector(".long").value};if(""===n.name)return void alert("Введите название тикета");"create"===s?this.createFormSend(n):"redact"===s&&this.updateFormSend(t,n)}else"remove"===s&&e.target.classList.contains("confirm")?this.deleteFormSend(t):e.target.classList.contains("deny")&&r.formRemove()}createFormSend(t){e.create(JSON.stringify(t),((e,t)=>{if(e&&console.log(e),t){const e=JSON.parse(t);this.renderTicket(e),r.formRemove()}}))}updateFormSend(t,s){e.update(t,JSON.stringify(s),((e,t)=>{e&&console.log(e),t&&(this.init(),document.querySelector(".form")&&r.formRemove())}))}deleteFormSend(t){e.delete(t,((e,t)=>{e&&console.log(e),204===t&&(console.log("done"),this.init(),r.formRemove())}))}static formRemove(){document.querySelector(".form").remove()}renderTicket(e){const t=new n(e).generateTicket();this.ticketArea.appendChild(t)}static deskCheck(e,t){const s=e.querySelector(".fullDesk");s?s.remove():r.fullDesk(e,t)}static fullDesk(t,s){e.get(s,((e,s)=>{if(e&&console.log(e),s){const e=JSON.parse(s),r=new n(e).addDesk();r.style.left=`${t.querySelector(".short_desk").offsetLeft}px`,t.appendChild(r)}}))}}const o=document.getElementById("root"),a=new r(o);a.init(),document.body.addEventListener("click",a.onClick)})();