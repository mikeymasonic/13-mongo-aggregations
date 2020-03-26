const Book = require('../lib/models/Book');
const Author = require('../lib/models/Author');
const chance = require('chance').Chance();

module.exports = async({ createdAuthors = 10, createdBooks = 100 } = {}) => {
  // const names = ['Tristan Shone', 'Dr. Seuss', 'Stephen King'];
  const authors = await Author.create([...Array(createdAuthors)].map(() => ({
    name: chance.name()
  })));

  await Book.create([...Array(createdBooks)].map(() => ({
    title: chance.sentence(),
    pages: chance.d100(),
    authorId: chance.pickone(authors)._id
  })));
};
