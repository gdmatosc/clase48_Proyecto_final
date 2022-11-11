/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */

const mongoose=require('mongoose');
const ObjectId=require('mongoose').Types.ObjectId;

const logd = require('../../logging.js')
const modname='[contenedorMongoIdAlias.js]'
const logr=logd.child({modulo:`${modname}`})
let loger=logd.child({modulo:`${modname}[fn]`})
//logr.debug('fn()',{recurso:'[na]'})
//loger=logd.child({modulo:`${modname}[fn]`})
//loger.verbose(i,{recurso:"i:"})

/* #endregion */

/* #region. 2.Key.function:ContenedorMongo*/
class ContenedorMongo {
    //argumentos del constructor: uri,model
    constructor(model){
        this.model=model
    }

    async save(obj){
        const newProduct=new this.model(obj);
        console.log("[contenedorMongoIdAlias.js][save()]",obj) //debug
        await newProduct.save()
        return newProduct
    }
 
    async getById(id){
          loger=logd.child({modulo:`${modname}[getById()]`})
          loger.verbose(id,{recurso:"id:"})
        let resultado=await this.model.find({alias: id})
          loger.verbose(resultado,{recurso:"resultado:"})
        if (typeof resultado !== 'undefined' && resultado.length > 0){
              loger.verbose(resultado[0],{recurso:"resultado[0]:"})
            return resultado[0]
        }
        else{
            return []
        }
    }

    async getAll(){
        loger=logd.child({modulo:`${modname}[getAll()]`})
        //loger.verbose(i,{recurso:"i:"})
        loger.verbose('inicio',{recurso:"[na]"})
        let resultado=await this.model.find({})
        //let resultado=[{'products':[{'nombre':'mouse'}]}]
        loger.verbose(resultado,{recurso:"resultado: "})
        if (typeof resultado !== 'undefined' && resultado.length > 0){
            loger.verbose('en if',{recurso:"[na]"})
            return resultado
        }
        else{
            loger.verbose('en else',{recurso:"[na]"})
            return []
        }
        
    }

    async editById(obj,id){
        const objUpdated=await this.model.updateOne(
            {id: id},
            {$set:obj}
        )
        return objUpdated
    }

    async addID(objeto,dataBase){
        try{
            return objeto
        }
        catch (error){
            console.log(error)
        }
    }

    async editByBody(obj){
          loger=logd.child({modulo:`${modname}[editByBody()]`})
          loger.verbose(obj,{recurso:"obj:"})
        const objUpdated=await this.model.updateOne(
            {alias:obj.alias},
            {$set:obj}
        )
          loger.verbose(objUpdated,{recurso:"objUpdated:"})
        return objUpdated
    }

    async deleteByBody(obj){
        loger=logd.child({modulo:`${modname}[deleteByBody()]`})
        loger.verbose(obj,{recurso:"obj:"})
        //let resultado=await this.model.find({id: obj.alias})
        //let resultadoDelete=resultado[0].products //debug
        //loger.verbose(resultadoDelete,{recurso:"resultadoDelete:"})
        await this.model.updateOne({ id: obj.alias }, { $pull: {products:{ _id: new ObjectId(obj.id) } }})

        return true
    }

    async deleteById(id){
        console.log("MongoDBdeleteByID",id)
        const userDelete=await this.model.deleteOne({_id: new ObjectId(id)})
        return true
    }

    async deleteAll(){
        console.log("deleteAllContenedorMongoDB")
        const userDeleteAll=await this.model.deleteMany()
        return true
    }

}
/* #endregion */


module.exports=ContenedorMongo;


