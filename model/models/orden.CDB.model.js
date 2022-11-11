const mongoose=require('mongoose');
const mongodb = require('../mongodb.js')

let connOrdenCDB=mongoose.createConnection(mongodb.connection.urlC,mongodb.options)

const ordenCollection='ordenProductos'

const productosSchemaContados=new mongoose.Schema({
    nombre:{type:String, require:true,max:100},
    img:{type:String, require:true,max:100},
    precio:{type:Number, require:true,max:200},
    descripcion:{type:String, require:true,max:100},
    categoria:{type:String, require:true,max:100},
    cantidad:{type:Number, require:true,max:100}
})

const ordenSchema = new mongoose.Schema({
    numeroOrden:{type:Number, require:true,max:100},
    fechaHora:{type:String, require:true,max:100},
    email:{type:String, require:true,max:100},
    direccionEntrega:{type:String, require:true,max:200},
    estado:{type:String, require:true,max:100},
    products: [productosSchemaContados]
  });

const ordenCDBModel=connOrdenCDB.model(ordenCollection,ordenSchema)
module.exports=ordenCDBModel;




