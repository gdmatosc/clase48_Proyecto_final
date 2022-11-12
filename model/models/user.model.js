//Conexión con nube
const mongoose=require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const mongodb = require('../mongodb.js')

let connUsers=mongoose.createConnection(mongodb.connection.urlC,mongodb.options)

const usersCollection='Users'

const usersSchema=new mongoose.Schema({
    username:{type:String, require:true, unique: true,max:100},
    passwordHash: { type: String, required: true },
    name:{type:String, require:true,max:100},
    email:{type:String, require:true,max:100},
    address:{type:String, require:true,max:100},
    age:{type:Number, require:true,max:100},
    telephone:{type:String, require:true,max:100},
})

usersSchema.plugin(uniqueValidator);

usersSchema.methods.validPassword = function(password) {
  console.log("[user.model.js](msg) password: ",password)
  return bcrypt.compareSync(password, this.passwordHash);
};

usersSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
});


const usersModel=connUsers.model(usersCollection,usersSchema)
module.exports=usersModel;
