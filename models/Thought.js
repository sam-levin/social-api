const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        // code here to give it a max of 280 characters
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
}
,
{
    toJSON: {
        getters: true
    },
    id: false
})

const ThoughtSchema = new Schema({
    thoughtId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    thoughtText: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reaction: [
        ReactionSchema
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
})


ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reaction.length;
  });


const Thought = model('Thought', ThoughtSchema)
module.exports = Thought 