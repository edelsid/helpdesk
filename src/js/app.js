import HelpDesk from './HelpDesk';

const root = document.getElementById('root');

const app = new HelpDesk(root);

app.init();

document.body.addEventListener('click', app.onClick);
