const User = require('../models/User')

const userController = {
    getAllUsers(req, res){
        User.find({})
        .select('-__v')
        .sort({ _id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
    createUser({ body } , res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },
    getUserById( { params }, res){

    },
    updateUser( {params, body}, res){

    },
    deleteUser({ params }, res){

    }
}

module.exports = userController