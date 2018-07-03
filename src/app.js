import express from 'express';
import bandsRouter from './bands/router';
import musiciansRouter from './musicians/router';
import roadiesRouter from './roadies/router';
import errorHandler from './middleware/error';
import notFound from './middleware/404';
import authRouter from './auth/router';

const app = express();

app.use(express.json());

app.use(authRouter);

app.use('/api/v1/bands', bandsRouter);
app.use('/api/v1/musicians', musiciansRouter);
app.use('/api/v1/roadies', roadiesRouter);

app.use(notFound);

app.use(errorHandler);

module.exports = {

  start: port => {
    app.listen(port, () => console.log('Listening on port', port));
  },
  stop: () => app.close(),
  app,
};