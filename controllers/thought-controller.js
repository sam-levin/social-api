const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
    getAllThoughts(req, res){
        Thought.find({})
        .populate({
            path: 'reaction',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
    createThought({ body } , res){
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id }},
                    { new: true}
                );
            })
            .then(dbThoughtData => {res.json(dbThoughtData)})
            .catch(err => res.status(400).json(err))
    },
    getThoughtById( { params }, res){
        Thought.findOne({ _id: params.id })
            .select('-__')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with this id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            })
    },
    updateThought( {params, body}, res){
        Thought.findOneAndUpdate({ _id:params.id}, body, {new: true, runValidators: true})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Cannot update thought. No Thought found with this id'})
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err));
    },
    deleteThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.id})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Cannot delete thought. No Thought found with this id'})
                    return
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err))
    },
    createReaction( { params, body} , res) {
        Thought.findOneAndUpdate(
            { _id: params.id},
            { $push: {reaction: body }},
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this id'})
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    deleteReaction( { params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reaction: { reactionId: body.reactionId }}},
            { new: true}
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err))
    }
}

module.exports = thoughtController