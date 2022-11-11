const mongoose=require('mongoose');
const mongodb = require('../mongodb.js')
const logd = require('../../logging.js')
const modname='[proveedores.LDB.model.js]'
const logr=logd.child({modulo:`${modname}`})

let connproveedoresLDB=mongoose.createConnection(mongodb.connection.urlC,mongodb.options)
const proveedoresCollection='proveedoresGeneral'

const proveedoresSchema=new mongoose.Schema({
    nombre:{type:String, require:true,max:100},
    img:{type:String, require:true,max:100},
    descripcion:{type:String, require:true,max:100},
    telefono:{type:String, require:true,max:100},
})

const proveedoresLDBModel=connproveedoresLDB.model(proveedoresCollection,proveedoresSchema)
logr.debug(JSON.stringify(proveedoresLDBModel),{recurso:'proveedoresLDBModel'})
module.exports=proveedoresLDBModel;
