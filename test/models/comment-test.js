"use strict";

const chai = require('chai')

const bookshelf = require('../../app/db/bookshelf')
const Comment = require('../../app/models/comment')

const expect = chai.expect

const mockComment = {
  user: 'Lebron James'
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

  it('saves a record to the database', () => {
    return Comment.forge()
      .save(mockComment, {transacting: transaction})
      .then(comment => {
        expect(comment.get('id')).to.be.a('number')
        expect(comment.get('user')).to.be.a('string')
      })
  })
})