module.exports = {
    authenticateUser: require('./user-logic/authenticateUser'),
    createPost: require('./post-logic/createPost'),
    deletePost: require('./post-logic/deletePost'),
    editPost: require('./post-logic/editPost'),
    editUser: require('./user-logic/editUser'),
    registerUser: require('./user-logic/registerUser'),
    retrieveFavPosts: require('./post-logic/retrieveFavPosts'),
    retrievePost: require('./post-logic/retrievePost'),
    retrievePosts: require('./post-logic/retrievePosts'),
    retrievePostsOfUser: require('./post-logic/retrievePostsOfUser'),
    retrievePostsNotFollowed: require('./post-logic/retrievePostsNotFollowed'),
    retrieveUser: require('./user-logic/retrieveUser'),
    retrieveUserById: require('./user-logic/retrieveUserById'),
    retrieveUsersNotFollowed: require('./user-logic/retrieveUsersNotFollowed'),
    toggleFavPost: require('./post-logic/toggleFavPost'),
    toggleFollowUser: require('./user-logic/toggleFollowUser')
}