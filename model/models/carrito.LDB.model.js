const mongoose=require('mongoose');
const mongodb = require('../mongodb.js')

let connCarritoLDB=mongoose.createConnection(mongodb.connection.urlC,mongodb.options)

const carritoCollection='carritoProductos'

const productosSchema=new mongoose.Schema({
    nombre:{type:String, require:true,max:100},
    img:{type:String, require:true,max:100},
    precio:{type:Number, require:true,max:200},
    descripcion:{type:String, require:true,max:100},
    categoria:{type:String, require:true,max:100},
    cantidad:{type:Number, require:true,max:100}
})

const carritoSchema = new mongoose.Schema({
    id:{type:Number, require:true,max:100},
    products: [productosSchema]
  });

const carritoLDBModel=connCarritoLDB.model(carritoCollection,carritoSchema)
module.exports=carritoLDBModel;

