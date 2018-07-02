import mongoose from 'mongoose';
import {
  Mockgoose,
} from 'mockgoose-fix';

// Give a longer timeout for when Travis runs slow
jest.setTimeout(60000);

const mockgoose = new Mockgoose(mongoose);

export default {
  prepare: () => {
    return mockgoose.prepareStorage().then(() => {
      return mongoose.connect('mongodb://localhost/supergoose').catch(err => {
        console.log('already connected, no sweat', err);
      });
    }).catch(console.error);
  },
  
};

afterEach((done) => {
  // console.log('after each');
  mockgoose.helper.reset().then(done);
});