const chai = require('chai')

const Comment = require('../../app/models/comment')
const User = require('../../app/models/user')
const Post = require('../../app/models/post')
const bookshelf = require('../../app/db/bookshelf')

const expect = chai.expect

const mockComment = {
  user_id: 2,
  post_id: 4
}

describe('Comment', () => {
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

   it('has a user id and a post id', () => {
    return Comment.forge()
      .save(mockComment, {transacting: transaction})
      .then(comment => {
        expect(comment.get('id')).to.be.a('number')
        expect(comment.get('user_id')).to.be.a('number')
        expect(comment.get('post_id')).to.be.a('number')
      })
  })
})
