import express from 'express';
import router from './api/api.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/404.js';

const app = express();

app.use(express.json());
app.use('/api/v1', router);

app.use(notFound);
app.use(errorHandler);


module.exports = {

  start: port => {
    app.listen(port, () => console.log('Listening on port', port));
  },
  stop: () => app.close(),
  server: app,
};