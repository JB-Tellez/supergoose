import { Router } from 'express';
import Roadie from './model';
import auth from '../auth/middleware';

const router = new Router();

router.get('/', (req, res, next) => {
  Roadie
    .find()
    .then(bands => res.send(bands))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  Roadie
    .create(req.body)
    .then(band => res.send(band))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Roadie.findByIdAndUpdate(req.params.id, req.body)
    .then(band => res.send(band))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Roadie.findByIdAndRemove(req.params.id)
    .then(results => res.send(results))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Roadie
    .findById(req.params.id)
    .then(band => res.send(band))
    .catch(next);
});

router.get('/protected', auth, (req, res) => {
  res.send('the keys to the Roadie kingdom');
});

export default router;
