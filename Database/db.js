const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    URL:{type: Number, require: true},
    password: {type: String, require: true}
})

const userModel =  new model('user', userSchema);

module.exports ={
    userModel: userModel
}