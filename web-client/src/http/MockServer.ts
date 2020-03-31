import { Model, Server } from 'miragejs';

export const initializeMockServer = () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  // eslint-disable-next-line no-new
  new Server({
    models: {
      auth: Model,
    },
    routes() {
      this.urlPrefix = `${process.env.REACT_APP_API_BASE_URL}`;
      this.namespace = '/';

      this.post(
        '/login',
        () => {
          const authentication = {
            data: {
              userId: 1,
              accessToken: 'some_acess_token',
            },
          };
          return authentication;
        },
        { timing: 2000 },
      );

      // Allow facebook auth to pass through
      this.urlPrefix = 'https://graph.facebook.com';
      this.namespace = '/';
      this.passthrough();
    },
  });
  // window.fetch(`${process.env.REACT_APP_API_BASE_URL}/api/login`, { method: 'post' }).then();
};
