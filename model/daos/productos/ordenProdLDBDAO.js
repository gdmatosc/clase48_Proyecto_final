const ContenedorMongo=require('../../contenedores/contenedorMongoIdAlias')
const ordenLDBModel=require('../../models/orden.LDB.model')

class ordenProductosMongoLDBDAO extends ContenedorMongo{
    constructor(){
        super(ordenLDBModel)
    }
}

module.exports=ordenProductosMongoLDBDAO