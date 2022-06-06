const router = require('express').Router();
const {
    getAllUsers, createUser, getUserById, updateUser, deleteUser
} = require('../../controllers/user-controller')

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router