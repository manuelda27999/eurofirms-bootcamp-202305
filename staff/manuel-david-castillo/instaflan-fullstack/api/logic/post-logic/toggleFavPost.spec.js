require('dotenv').config()
const { mongoose } = require('mongoose')

const toggleFavPost = require('./toggleFavPost')
const { MONGODB_URL } = process.env

const { User, Post } = require('../../data/models')
const { expect } = require('chai')

describe('toggleFavPost', () => {
    before(() => mongoose.connect(`${MONGODB_URL}/instaflan-test`))

    /* prepare scenario */

    let name
    let email
    let password
    let userId

    let name2
    let email2
    let password2
    let userId2

    let text
    let image
    let postId
    let postId2

    beforeEach(() => {
        name = `name-${Math.random()}`
        email = `user-${Math.random()}@gmail.com`
        password = `pass-${Math.random()}`

        name2 = `name-${Math.random()}`
        email2 = `user-${Math.random()}@gmail.com`
        password2 = `pass-${Math.random()}`

        text = `text-${Math.random()}`
        image = `https://${Math.random()}.jpg`

        return Promise.all([User.create({ name, email, password }),
        User.create({ name: name2, email: email2, password: password2 })])
            .then(([user, user2]) => {
                userId = user.id
                userId2 = user2.id
                const likes = 0

                const comments = []
                const comment = {
                    author: user._id,
                    text: text,
                    date: new Date()
                }

                comments.push(comment)

                const comment2 = {
                    author: user._id,
                    text: text,
                    date: new Date()
                }

                comments.push(comment2)

                return Promise.all([Post.create({ author: user._id, image, text, likes, comments }),
                Post.create({ author: user._id, image, text, likes, comments }),
                User.findById(userId, '-__v')])
            })
            .then(([post, post2, user]) => {
                postId = post.id
                postId2 = post2.id

                user.favPosts.push(post2._id)

                return user.save()
            })
    })

    it('toggleFavPost correct', () =>
        toggleFavPost(userId, postId)
            .then(() => {
                return User.findById(userId, '-__v')
            })
            .then(user => {
                expect(user.favPosts.length).to.equal(2)
            })
    )

    it('toggleFavPost correct', () =>
        toggleFavPost(userId, postId2)
            .then(() => {
                return User.findById(userId, '-__v')
            })
            .then(user => {
                expect(user.favPosts.length).to.equal(0)
            })
    )

    it('toggleFavPost correct', () =>
        toggleFavPost(userId2, postId)
            .then(() => {
                return User.findById(userId2, '-__v')
            })
            .then(user => {
                expect(user.favPosts.length).to.equal(1)
            })
    )

    it('fail for user not found', () =>
        toggleFavPost('123456123456123456123456', postId)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('user not found')
            })
    )

    it('fail for post not found', () =>
        toggleFavPost(userId, '123456123456123456123456')
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('post not found')
            })
    )

    it('fail for author of post and user diferent', () =>
        toggleFavPost(userId2, '123456123456123456123456')
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('post not found')
            })
    )

    after(() => mongoose.disconnect())
})