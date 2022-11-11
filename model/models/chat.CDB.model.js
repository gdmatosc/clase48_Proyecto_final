const mongoose=require('mongoose');
const mongodb = require('../mongodb.js')

let connChatCDB=mongoose.createConnection(mongodb.connection.urlC,mongodb.options)

const chatCollection='chatBasic'

const chatSchema=new mongoose.Schema({
    tipo:{type:String, require:true,max:100},
    email:{type:String, require:true,max:100},
    fechaHora:{type:String, require:true,max:100},
    thumbnail:{type:String, require:true,max:100},
    cuerpoMensaje:{type:String, require:true,max:100}
})

const chatCDBModel=connChatCDB.model(chatCollection,chatSchema)
module.exports=chatCDBModel;