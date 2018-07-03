import supertest from 'supertest';
import superagent from 'superagent';

const {
  app,
} = require('../../src/app.js');

const mockRequest = supertest(app);
const API_STUB = '/api/v1';

describe('app module', () => {

  it('supertest should exist', () => {
    expect(supertest);
  });

  it('app should exist', () => {
    expect(app);
  });

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

  it('should give access to protected route with token', async () => {

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

    expect(response.text).toBe('the keys to the band kingdom');
  });

  it('should protect route when no token', async () => {

    const response = await mockRequest.get('/api/v1/bands/protected');

    expect(response.status).toBe(401);

  });

  it('should protect route when bad token', async () => {

    const response = await mockRequest
      .get('/api/v1/bands/protected')
      .set('Authorization', 'Bearer ' + 'badtoken');

    expect(response.status).toBe(401);

  });

  it('should get [] for initial request to GET bands', async () => {

    const response = await mockRequest.get(API_STUB + '/bands');
    
    expect(JSON.parse(response.text)).toEqual([]);
  });

  it('should get populated list after creating', async () => {

    let response = await mockRequest.post(API_STUB + '/bands')
      .send({
        name: 'The Who',
      });


    expect(response.body.name).toBe('The Who');

    response = await mockRequest.get(API_STUB + '/bands');

    expect(response.body.length).toBe(1);
  });

  it('should get error 404 if unfound id', async () => {

    const response = await mockRequest.get(API_STUB + '/bands/unknown_id');

    expect(response.status).toBe(404);

  });

  it('should update resource', async () => {

    let response = await mockRequest.post(API_STUB + '/bands')
      .send({
        name: 'The Who',
      });

    const band = response.body;

    response = await mockRequest
      .put(API_STUB + '/bands/' + band._id)
      .send({name : 'The Whom'})
      .catch(fail);
    
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('The Whom');

  });
});