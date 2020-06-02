const { getBook, getBooks, getAuthor } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('book routes', () => {

  it('creates a book', async() => {
    const author = await getAuthor();

    return request(app)
      .post('/api/v1/books')
      .send({ 
        title: 'Budge: A Life Story',
        pages: 99,
        authorId: author._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Budge: A Life Story',
          pages: 99,
          authorId: author._id,
          __v: 0
        });
      });
  });

  it('gets a book by id', async() => {
    const author = await getAuthor();
    const book = await getBook({ authorId: author._id });

    return request(app)
      .get(`/api/v1/books/${book._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...book,
          authorId: author
        });
      });
  });

  it('gets all books', async() => {
    const books = await getBooks();

    return request(app)
      .get('/api/v1/books/')
      .then(res => {
        expect(res.body).toEqual(books);
      });
  });

  it('updates a book by id', async() => {
    const book = await getBook();

    return request(app)
      .patch(`/api/v1/books/${book._id}`)
      .send({ title: 'Gimmie dem tweeds' })
      .then(res => {
        expect(res.body).toEqual({
          ...book,
          title: 'Gimmie dem tweeds'
        });
      });
  });

  it('deletes a book by id', async() => {
    const book = await getBook();

    return request(app)
      .delete(`/api/v1/books/${book._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...book
        });
      });
  });

});
