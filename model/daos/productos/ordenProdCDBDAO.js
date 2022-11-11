const ContenedorMongo=require('../../contenedores/contenedorMongoIdAlias')
const ordenCDBModel=require('../../models/orden.CDB.model')

class ordenProductosMongoCDBDAO extends ContenedorMongo{
    constructor(){
        super(ordenCDBModel)
    }
}

module.exports=ordenProductosMongoCDBDAO