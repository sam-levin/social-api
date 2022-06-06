const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { schema } = require('./Thought');

const UserSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']    
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [this]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id:false
    }
)

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
  });

const User = model('User', UserSchema)

module.exports = User