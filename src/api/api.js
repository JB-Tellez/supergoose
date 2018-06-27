import { Router } from 'express';
import Musician from './../models/musicians.js';
import Band from './../models/bands.js';

const router = new Router();

router.get('/bands', (req, res, next) => {
  Band
    .find()
    .then(bands => res.send(bands))
    .catch(err => next(err));
});

router.post('/bands', (req, res, next) => {
  Band.create(req.body).then(band => res.send(band)).catch(next);
});

router.put('/bands/:id', (req, res, next) => {
  Band.findByIdAndUpdate(req.params.id, req.body)
    .then(band => res.send(band))
    .catch(next);
});

router.delete('/bands/:id', (req, res, next) => {
  Band.findByIdAndRemove(req.params.id)
    .then(results => res.send(results))
    .catch(next);
});

router.get('/bands/:id', (req, res, next) => {
  Band
    .findById(req.params.id)
    .then(band => res.send(band))
    .catch(next);
});


// musicians
router.post('/musicians', (req, res, next) => {

  Musician
    .create(req.body)
    .then(musician => {
      res.send(musician);
    }).catch(next);
});

router.get('/musicians', (req, res, next) => {
  Musician
    .find()
    .populate('band')
    .exec()
    .then(musicians => {
      res.send(musicians);
    }).catch(next);
});










/*
router.get('/bands', (req, res) => {
  Band.find().then(bands => res.send(bands)).catch(err => res.send(err));
});

router.post('/bands', express.json(), (req, res, next) => {
  Band.create(req.body).then(band => res.send(band)).catch(err => {
    res.send(err);
  });
});

router.put('/bands/:id', (req, res, next) => {
  Band
    .findByIdAndUpdate(req.params.id, req.body)
    .then(band => {
      if(!band) {
        next('ouch');
      } else {
        res.send(band);
      }
      
    }).catch(next);
});
router.delete('/bands/:id', (req, res, next) => {
  Band.findByIdAndRemove(req.params.id).then(results => res.send(results));
});



router.get('/musicians', (req, res) => {
  Musician.find().then(musicians => res.send(musicians)).catch(err => res.send(err));
});

router.post('/musicians', express.json(), (req, res) => {
  Musician.create(req.body).then(musician => res.send(musician)).catch(err => res.send(err));
});
*/

export default router;
