const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
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
    //replies: [ {
//         type: Schema.Types.ObjectId,
//         ref: 'Reaction'
//     }]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
})


// ThoughtSchema.virtual('reactionCount').get(function(){
//     return this.reaction.length;
//   });