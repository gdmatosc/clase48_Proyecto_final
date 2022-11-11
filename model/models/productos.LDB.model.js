const mongoose=require('mongoose');
const mongodb = require('../mongodb.js')
const logd = require('../../logging.js')
const modname='[productos.LDB.model.js]'
const logr=logd.child({modulo:`${modname}`})

let connProductosLDB=mongoose.createConnection(mongodb.connection.urlC,mongodb.options)
const productosCollection='productosGeneral'

const productosSchema=new mongoose.Schema({
    nombre:{type:String, require:true,max:100},
    img:{type:String, require:true,max:100},
    precio:{type:Number, require:true,max:200},
    descripcion:{type:String, require:true,max:100},
    categoria:{type:String, require:true,max:100},
})

const productosLDBModel=connProductosLDB.model(productosCollection,productosSchema)
logr.debug(JSON.stringify(productosLDBModel),{recurso:'productosLDBModel'})
module.exports=productosLDBModel;
