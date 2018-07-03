import { Router } from 'express';
import Band from './model';
import auth from '../auth/middleware';

const router = new Router();

router.get('/protected', auth, (req, res) => {
  res.send('the keys to the band kingdom');
});

router.get('/', (req, res, next) => {
  Band
    .find()
    .then(bands => res.send(bands))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  Band
    .create(req.body)
    .then(band => res.send(band))
    .catch(next);
});

router.put('/:id', (req, res, next) => {

  Band.findByIdAndUpdate(req.params.id, req.body, {new : true})

    .then(band => res.send(band))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Band.findByIdAndRemove(req.params.id)
    .then(results => res.send(results))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Band
    .findById(req.params.id)
    .then(band => res.send(band))
    .catch(next); 
});

export default router;
