const { getAuthor, getAuthors, getBook, getBooks } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('author routes', () => {

  it('creates an author', () => {
    return request(app)
      .post('/api/v1/authors')
      .send({ name: 'rico' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'rico',
          __v: 0
        });
      });
  });

  it('gets an author by id', async() => {
    const author = await getAuthor();

    return request(app)
      .get(`/api/v1/authors/${author._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...author
        });
      });
  });
  
  it('gets all authors', async() => {
    const authors = await getAuthors();

    return request(app)
      .get('/api/v1/authors/')
      .then(res => {
        expect(res.body).toEqual(authors);
      });
  });

  it('updates an author by id', async() => {
    const author = await getAuthor();

    return request(app)
      .patch(`/api/v1/authors/${author._id}`)
      .send({ name: 'Rico Budge' })
      .then(res => {
        expect(res.body).toEqual({
          ...author,
          name: 'Rico Budge'
        });
      });
  });

  it('deletes an author by id', async() => {
    const author = await getAuthor();

    return request(app)
      .delete(`/api/v1/authors/${author._id}`)
      .send({ name: 'Rico Budge' })
      .then(res => {
        expect(res.body).toEqual({
          ...author
        });
      });
  });

});
