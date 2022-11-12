/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */ 

const chatFileDAO=require('./chat/chatFileDAO')
const chatMongoLDBDAO=require('./chat/chatMongoLDBDAO')
const chatMongoCDBDAO=require('./chat/chatMongoCDBDAO')
const productosGeneralFileDAO=require('./productos/productosFileDAO')
const productosGeneralMongoLDBDAO=require('./productos/productosLDBDAO')
const productosGeneralMongoCDBDAO=require('./productos/productosCDBDAO')
const carritoProductosFileDAO=require('./productos/carritoProdFileDAO')
const carritoProductosMongoLDBDAO=require('./productos/carritoProdLDBDAO')
const carritoProductosMongoCDBDAO=require('./productos/carritoProdCDBDAO')
const ordenProductosMongoCDBDAO=require('./productos/ordenProdCDBDAO')
const ordenProductosMongoLDBDAO=require('./productos/ordenProdLDBDAO')

const logd = require('../../logging.js')
const modname='[indexDAO.js]'
const logr=logd.child({modulo:`${modname}`})

/* #endregion */ 

let typeDB=process.env.TIPO_PERSISTENCIA
//let typeDB='mongoCDB'
//let typeDB='file'
const FactoryDAO=()=>{
    const loger=logd.child({modulo:`${modname}[FactoryDAO]`})
    loger.info(typeDB,{recurso:'typeDB'})
    if(typeDB=='file') {
        loger.verbose(`Generate DAO with File: ${typeDB}`,{recurso:'typeDB'})
        return{
            chatGeneral:new chatFileDAO(),
            productosGeneral: new productosGeneralFileDAO(),
            carritoProductos: new carritoProductosFileDAO(),
            //ordenProductos: new ordenProductosFileDAO(),
        }
    } else if(typeDB=='mongoLDB'){
        loger.verbose(`Generate DAO with Mongo Ldb: ${typeDB}`,{recurso:'typeDB'})
        return{
            chatGeneral:new chatMongoLDBDAO(),
            productosGeneral: new productosGeneralMongoLDBDAO(),
            carritoProductos: new carritoProductosMongoLDBDAO(),
            ordenProductos: new ordenProductosMongoLDBDAO(),
        }
    } else if(typeDB=='mongoCDB'){
        loger.verbose(`Generate DAO with Mongo Cdb: ${typeDB}`,{recurso:'typeDB'})
        return{
            chatGeneral:new chatMongoCDBDAO(),
            productosGeneral: new productosGeneralMongoCDBDAO(),
            carritoProductos: new carritoProductosMongoCDBDAO(),
            ordenProductos: new ordenProductosMongoCDBDAO(),
        }
    }
    throw new Error('typeDB is not found')
}  

module.exports=FactoryDAO