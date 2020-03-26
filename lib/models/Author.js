const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtual: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'authorId'
});

schema.statics.topBooks = function() {
  return this.aggregate([
    {
      '$lookup': {
        'from': 'books', 
        'localField': '_id', 
        'foreignField': 'authorId', 
        'as': 'books'
      }
    }, {
      '$project': {
        '_id': true, 
        'name': true, 
        'totalBooks': {
          '$size': '$books'
        }
      }
    }, {
      '$sort': {
        'totalBooks': -1
      }
    }, {
      '$limit': 3
    }
  ]);
};

schema.statics.mostPages = function() {
  return this.aggregate([
    {
      '$lookup': {
        'from': 'books', 
        'localField': '_id', 
        'foreignField': 'authorId', 
        'as': 'books'
      }
    }, {
      '$unwind': {
        'path': '$books'
      }
    }, {
      '$project': {
        'authorID': '$books.authorId', 
        'name': true, 
        'title': '$books.title', 
        'totalPages': '$books.pages'
      }
    }, {
      '$sort': {
        'totalPages': -1
      }
    }, {
      '$limit': 3
    }
  ]);
};

module.exports = mongoose.model('Author', schema);
