const ContenedorMongo=require('../../../model/contenedores/contenedorFile')

class ChatFileDAO extends ContenedorMongo{
    constructor(){
        super('chat.json')
    }
}

module.exports=ChatFileDAO