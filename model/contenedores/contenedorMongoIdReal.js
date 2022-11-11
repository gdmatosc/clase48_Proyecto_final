/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */

const mongoose=require('mongoose');
const ObjectId=require('mongoose').Types.ObjectId;

const logd = require('../../logging.js')
const modname='[contenedorFile.js]'
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
          logr.debug('inicio',{recurso:'[save()][na]'})
        const newProduct=new this.model(obj);
        await newProduct.save()
        return newProduct
    }
 
    async getById(id){
        return this.model.find({_id: new ObjectId(id)})
    }

    async getByField(fieldParametro,fieldValor){
        loger=logd.child({modulo:`${modname}[getByField()]`})
        //loger.verbose(i,{recurso:"i:"})
        loger.verbose(fieldParametro,fieldValor,{recurso:"fieldParametro,fieldValor:"})       
        let resultado=[]
        if (fieldParametro=='categoria'){
              loger.verbose('inicio de if',{recurso:"[na]"})
            resultado=await this.model.find({categoria:fieldValor})
        }else{
              loger.verbose('inicio de else',{recurso:"[na]"})
            resultado=await this.model.find({_id: new ObjectId(fieldValor)})
        }
          loger.verbose(resultado,{recurso:"resultado:"})
        if (typeof resultado !== 'undefined' && resultado.length > 0){
            return resultado
        }
        else{
            return []
        }
        
    }

    async getAll(){
        return this.model.find({})
    }

    async editById(obj,id){
        const objUpdated=await this.model.updateOne(
            {_id: new ObjectId(id)},
            {$set:obj}
        )
        return objUpdated
    }

    async editByBody(obj){
        const objUpdated=await this.model.updateOne(
            {id: new ObjectId(obj.id)},
            {$set:obj}
        )
        return objUpdated
    }

    async deleteById(id){
        logr.debug('inicio',{recurso:'[deleteById()][na]'})
        const userDelete=await this.model.deleteOne({_id: new ObjectId(id)})
        return true
    }

    async deleteAll(){
        logr.debug('inicio',{recurso:'[deleteAll()][na]'})
        const userDeleteAll=await this.model.deleteMany()
        return true
    }

}
/* #endregion */

/*
    async editByBody(obj){
        console.log('UPDATE BY BODY');
        const objUpdated=await this.model.findOneAndUpdate(
            {"subschema.keyName": {keyName: "keyName_Valor"}.keyName},
            {$set:{"subschema.keyName.$": {KeyNameTarget:"value"}}}
        )
        return objUpdated
    }
*/


module.exports=ContenedorMongo;