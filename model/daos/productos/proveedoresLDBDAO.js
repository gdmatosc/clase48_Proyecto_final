const ContenedorMongo=require('../../contenedores/contenedorMongoIdReal')
const proveedoresLDBModel=require('../../models/proveedores.LDB.model')

class proveedoresGeneralMongoLDBDAO extends ContenedorMongo{
    constructor(){
        super(proveedoresLDBModel)
    }
}

module.exports=proveedoresGeneralMongoLDBDAO