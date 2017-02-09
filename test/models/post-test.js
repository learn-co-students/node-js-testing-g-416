"use strict"

const chai = require('chai')

const bookshelf = require('../../app/db/bookshelf')
const Post = require('../../app/models/post')

const expect = chai.expect

const mockPost = {
  author: 'Alfonzo'
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







