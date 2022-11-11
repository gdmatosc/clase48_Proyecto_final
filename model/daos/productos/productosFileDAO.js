const ContenedorMongo=require('../../../model/contenedores/contenedorFile')

class productosGeneralFileDAO extends ContenedorMongo{
    constructor(){
        super('productos.json')
    }
}

module.exports=productosGeneralFileDAO