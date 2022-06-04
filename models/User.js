const { Schema, model, Types } = require('mongoose');
//const dateFormat = require('../utils/dateFormat');

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
        // line here that makes it match a valid email address
    },
    // thoughts: [ThoughtSchema],
    // friends: [UserSchema ]
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