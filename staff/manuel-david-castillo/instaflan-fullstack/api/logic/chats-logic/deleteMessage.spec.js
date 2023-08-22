debugger
require('dotenv').config()

const deleteMessage = require('./deleteMessage')
const mongoose = require('mongoose')

const { MONGODB_URL } = process.env

const { User } = require('../../data/models')
const { Chat } = require('../../data/models')
const { expect } = require('chai')

describe('deleteMessage', () => {
    before(() => mongoose.connect(`${MONGODB_URL}/instaflan-test`))

    let name
    let email
    let password
    let userId

    let name2
    let email2
    let password2
    let userId2

    let chatId

    beforeEach(() => {
        name = `name-${Math.random()}`
        email = `user-${Math.random()}@gmail.com`
        password = `pass-${Math.random()}`

        name2 = `name-${Math.random()}`
        email2 = `user-${Math.random()}@gmail.com`
        password2 = `pass-${Math.random()}`

        text = `test-${Math.random()}`

        return Promise.all([User.create({ name, email, password }),
        User.create({ name: name2, email: email2, password: password2 })])
            .then(([user, user2]) => {
                userId = user.id
                userId2 = user2.id

                const date = new Date()
                const messages = []
                const users = [user._id, user2._id]

                const message = {
                    author: user._id,
                    text: text,
                    date: new Date(),
                    edit: false,
                    delete: false
                }

                messages.push(message)

                return Chat.create({ users, messages, date })
            })
            .then(chat => {
                chatId = chat.id
            })
    })

    after(() => mongoose.disconnect())
})