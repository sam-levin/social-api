const Thought = require('../models/Thought');
const User = require('../models/User')

const userController = {
    getAllUsers(req, res){
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
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
        User.findOne({ _id: params.id })
            .select('-__')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            })
    },
    updateUser( {params, body}, res){
        User.findOneAndUpdate({ _id:params.id}, body, {new: true, runValidators: true})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Cannot update user. No user found with this id'})
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
    },
    deleteUser({ params }, res){
        User.findOneAndDelete({ _id: params.id})
        // Thought.findByIdAndDelete( { _id: params.id})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Cannot delete user. No user found with this id'})
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate( 
            { _id: params.friendId },
            { $push: {friends: params.id }},
            { new: true, runValidators: true }
            )
        User.findOneAndUpdate( 
            { _id: params.id },
            { $push: {friends: params.friendId }},
            { new: true, runValidators: true }
            )
            .then( dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "Cannot add friend, no user found with this id"})
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err));
    },
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id},
            { $pull: { friends: { _id: params.friendId}}},
            { new: true },
        )
        // User.findOneAndUpdate(
        //     { _id: params.friendId},
        //     { $pull: {friends: {friendId: params.id}}},
        //     { new: true }
        // )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    }
}

module.exports = userController