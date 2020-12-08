const chai = require('chai')

const Comment = require('../../app/models/comment')
const User = require('../../app/models/user')
const Post = require('../../app/models/post')
const bookshelf = require('../../app/db/bookshelf')

const expect = chai.expect

const mockPost = {
  author: 'Cool Ethan'
}

describe('Post', () => {
  let transaction;

   beforeEach(done => {
    return bookshelf.transaction(t => {
      transaction = t
      done()
    })
  })

   afterEach(() => {
    transaction.rollback()
  })

   it('saves a Post to the database', () => {
    return Post.forge()
      .save(mockPost, { transacting: transaction})
      .then(post => {
        expect(post.get('id')).to.be.a('number')
      })
  })

 })
