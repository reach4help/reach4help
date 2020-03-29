import { Server } from 'miragejs';

export const initializeMockServer = () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  // eslint-disable-next-line no-new
  new Server({
    routes() {
      this.urlPrefix = `${process.env.REACT_APP_API_BASE_URL}`;
      this.namespace = '/api';

      // this route will handle the URL '/api/contacts'
      this.post('/login', () => ({
        name: 'Joao',
      }));
    },
  });
  // window.fetch(`${process.env.REACT_APP_API_BASE_URL}/api/login`, { method: 'post' }).then();
};
