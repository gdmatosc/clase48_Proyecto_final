const mongoose=require('mongoose');
const mongodb = require('../mongodb.js')

let connCarritoCDB=mongoose.createConnection(mongodb.connection.urlC,mongodb.options)

const carritoCollection='carritoProductos'

const productosSchemaContados=new mongoose.Schema({
    nombre:{type:String, require:true,max:100},
    img:{type:String, require:true,max:100},
    precio:{type:Number, require:true,max:200},
    descripcion:{type:String, require:true,max:100},
    categoria:{type:String, require:true,max:100},
    cantidad:{type:Number, require:true,max:100}
})

const carritoSchema = new mongoose.Schema({
    alias:{type:String, require:true,max:100},
    fechaHora:{type:String, require:true,max:100},
    email:{type:String, require:true,max:100},
    direccionEntrega:{type:String, require:true,max:200},
    products: [productosSchemaContados]
  });

const carritoCDBModel=connCarritoCDB.model(carritoCollection,carritoSchema)
module.exports=carritoCDBModel;




