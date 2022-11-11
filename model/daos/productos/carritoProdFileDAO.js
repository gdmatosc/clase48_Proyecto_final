const ContenedorMongo=require('../../../model/contenedores/contenedorFile')

class carritoProductosFileDAO extends ContenedorMongo{
    constructor(){
        super('carrito.json')
    }
}

module.exports=carritoProductosFileDAO