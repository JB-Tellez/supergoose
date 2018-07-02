import supertest from 'supertest';

import {
  app,
} from '../../../src/app';

const mockRequest = supertest(app);

describe('auth/router', () => {

  it('should sign up and return token', async () => {

    const token = await mockRequest
      .post('/signup')
      .send({
        username: 'foo',
        password: 'bar',
      })
      .then(response => response.text)
      .catch(fail);

    expect(token).toBeDefined();
  });

  it('should sign in', async () => {

    await mockRequest
      .post('/signup')
      .send({
        username: 'foo',
        password: 'bar',
      });

    await mockRequest
      .get('/signin')
      .auth('foo', 'bar')
      .then(response => {
        expect(response.text).toBe('Hi');
      });
  });

  it('should fail sign in with bad password', async () => {

    await mockRequest
      .post('/signup')
      .send({
        username: 'foo',
        password: 'bar',
      });

    await mockRequest
      .get('/signin')
      .auth('foo', 'badpassword')
      .then(response => {
        expect(response.status).toBe(401);
      });
  });

  it('should fail sign in with unknown name', async () => {

    await mockRequest
      .post('/signup')
      .send({
        username: 'foo',
        password: 'bar',
      });

    const response = await mockRequest
      .get('/signin')
      .auth('nobody', 'bar');

    expect(response.status).toBe(401);
  });

  it('should protect route', async () => {

    const response = await mockRequest.get('/api/v1/bands/protected');

    expect(response.status).toBe(401);

  });

  xit('should give access to protected route with token', async () => {

    const token = await mockRequest
      .post('/signup')
      .send({
        username: 'foo',
        password: 'bar',
      })
      .then(response => response.text);

    const response = await mockRequest
      .get('/api/v1/bands/protected')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .catch(fail);

    expect(response.text).toBe('the keys to the kingdom');
  });

});