const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    //here unique will not act as a validator , it will just be used fro internal optimizations.
    //to keep a check on uniqueness , install #rd party package 'mongoose-unique-validator'.
    //then connect it to schema.
    email: { type: String, required: true ,unique:true},
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);
//model post is created.
module.exports = mongoose.model('User',userSchema);