const {Schema, model, ObjectId} = require('mongoose')

const user = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    }, 
    description: {
        type: String
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 9
    },
    favPosts: [
        {
            type: ObjectId, 
            ref: 'Post'
        }
    ],
    following: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ]
})

const post = new Schema({
    text: {
        type: String,
        required: true 
    },
    image: {
        type: String,
        required: true
    }, 
    likes: {
        type: Number,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
})

const message = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        require: true
    },
    date: {
        type: Date, 
        default: Date.now
    }
})

const chat = new Schema({
    users: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    messages: [ message ],
    date: {
        type: Date, 
        default: Date.now
    } 
})



const User = model('User', user)
const Post = model('Post', post)
const Chat = model('Chat', chat)
/* const Message = model('Message', message) */

module.exports = {User, Post, Chat}