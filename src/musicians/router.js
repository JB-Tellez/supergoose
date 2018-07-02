import { Router } from 'express';
import Musician from './model';
import auth from '../auth/middleware';

const router = new Router();

router.get('/', (req, res, next) => {
  Musician
    .find()
    .then(bands => res.send(bands))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  Musician
    .create(req.body)
    .then(band => res.send(band))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Musician.findByIdAndUpdate(req.params.id, req.body)
    .then(band => res.send(band))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Musician.findByIdAndRemove(req.params.id)
    .then(results => res.send(results))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Musician
    .findById(req.params.id)
    .then(band => res.send(band))
    .catch(next);
});

router.get('/protected', auth, (req, res) => {
  res.send('the keys to the Musician kingdom');
});

export default router;
