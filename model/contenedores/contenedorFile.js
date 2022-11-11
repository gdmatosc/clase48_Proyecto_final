/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */

const fs=require('fs')

const logd = require('../../logging.js')
const modname='[contenedorFile.js]'
const logr=logd.child({modulo:`${modname}`})
//logr.debug('fn()',{recurso:'[na]'})
let loger=logd.child({modulo:`${modname}[fn]`})
//loger=logd.child({modulo:`${modname}[fn]`})
//loger.verbose(i,{recurso:"[i]"})

/* #endregion */

/* #region. 2.Key.class:Contenedor*/

class Contenedor {
    constructor(nombreArchivo){
        this.archivo=nombreArchivo
        this.data=[]
        try{
            logr.debug('Initializing File connection...',{recurso:'[na]'})
            this.init()
        }
        catch(error){
            logr.warn(`Error initializing File connection ${error}`,{recurso:'[na]'})

        }
    } 

    async init(){
        this.data=await this.getAll()
    }

    async addID(objeto,dataBase){
        try{
            await this.init()
              loger=logd.child({modulo:`${modname}[addID()]`})
              loger.verbose('inicio',{recurso:"[na]"})
            objeto={...objeto,id:dataBase.length+1}
            return objeto
        }
        catch (error){
            loger.warn(error,{recurso:"error: "})
        }
    }

    async save(objeto){
        try{
              loger=logd.child({modulo:`${modname}[save()]`})
              loger.verbose('inicio',{recurso:"[na]"})
            let objeto1=await this.addID(objeto,this.data)
            this.data.push(objeto1)
            await fs.promises.writeFile(`./model/files_storage/${this.archivo}`,JSON.stringify(this.data)+'\n')
            return objeto
        }
        catch (error){
            loger.warn(error,{recurso:"error: "})
        }
    }

    async getAll(){
        try{
            let objetosJSON=await fs.promises.readFile(`./model/files_storage/${this.archivo}`,'utf-8');
            let objetosParse = JSON.parse(objetosJSON);
            return objetosParse
        }
        catch (error){
            logr.warn(error,{recurso:'error: '})
        }
    }

    async getById(id){
        try{
            let productos=await this.getAll()
            let coincidencia=null
            productos.forEach(product =>{
                if(product.id===id){
                    coincidencia=product
                }
            })
            return coincidencia
        }
        catch(error){
            logr.warn(error,{recurso:'error: '})
        }
    }

    async deleteAll(){
        try{
              loger=logd.child({modulo:`${modname}[deleteAll()]`})
              loger.verbose('inicio',{recurso:"[na]"})
            await fs.promises.writeFile(`./model/files_storage/${this.archivo}`,'[]')
            return "Borrado completado de contenido del File"
        }
        catch(error){
              loger.warn(error,{recurso:"error: "})
        }
    }

    async editById(id,campo,valor){
        try{
            let productos=await this.getAll();
            let producto=productos.filter(producto=>producto.id===id)[0];
            producto[campo]=valor;
            const index=productos.findIndex(producto=>producto.id===id);
            productos.splice(index,1,producto);
            const productosParsed=JSON.stringify(productos);
            await fs.promises.writeFile(`./model/files_storage/${this.archivo}`,productosParsed)
        }
        catch(error){
            logr.warn(error,{recurso:'error: '})
        }
    }
    
    async editByBody(obj){
        try{

              loger=logd.child({modulo:`${modname}[editByBody()]`})
              loger.verbose('inicio',{recurso:"[na]"})
            let productos=await this.getAll(); 
            
            let producto=productos.filter(producto=>producto.id===obj.id)[0];
            
            const index=productos.findIndex(producto=>producto.id===obj.id);
            
            productos.splice(index,1,obj);
            
            const productosParsed=JSON.stringify(productos);
            
            await fs.promises.writeFile(`./model/files_storage/${this.archivo}`,productosParsed)
            return obj
        }
        catch(error){
            loger.warn(error,{recurso:"error: "})
        }
    }
    
    async deleteById(id){
        try{
              loger=logd.child({modulo:`${modname}[deleteById()]`})
              loger.verbose('inicio',{recurso:"[na]"})
            let productos=await this.getAll()
            
            id=Number(id)
            
            let productosCargar=productos.filter(obj=>obj.id !==id)
            let i=0;
            
            let productosCargarNew = productosCargar.map(function(obj){
                let rObj = {};
                rObj=obj
                i=i+1
                rObj.id = i;
                console.log("rObj.id",rObj.id)
                return rObj;
                });
            
            
            await this.deleteAll()
            let productosTemp=await this.getAll()
            
            
            await fs.promises.writeFile(`./model/files_storage/${this.archivo}`,JSON.stringify(productosCargarNew)+'\n')
        }
        catch(error){
            loger.warn(error,{recurso:"error: "})
        }
    }

    async deleteByBody(obj){
        try{
              loger=logd.child({modulo:`${modname}[deletByBody()]`})
              loger.verbose('inicio',{recurso:"[na]"})

            let productos=await this.getAll()
            let cartID=parseInt(obj.cartID)
            let productID=parseInt(obj.id)
            
            let productosCarritoFiltroNotCartID=productos.filter(producto=>producto.id !== cartID)[0];
            let productosCargar=[productosCarritoFiltroNotCartID]
            
            let productosCarritoFiltroEqCartID=productos.filter(producto=>producto.id===cartID)[0];
            
            let productosCarritoFiltroNotIdOfFiltroEqCartId=productosCarritoFiltroEqCartID.products.filter(producto=>producto.id !== productID);
            
            
            let i=0;
            let subproductosCargarPre = productosCarritoFiltroNotIdOfFiltroEqCartId.map(function(obj){
                let rObj = {};
                rObj=obj
                i=i+1
                rObj.id = i;
                console.log("rObj.id",rObj.id)
                return rObj;
                });
           

            let subproductosCargar={...{"products":subproductosCargarPre},id:cartID}
            
            productosCargar.push(subproductosCargar)
            
            
            await this.deleteAll()
            
            await fs.promises.writeFile(`./model/files_storage/${this.archivo}`,JSON.stringify(productosCargar)+'\n')
        }
        catch(error){
            loger.warn(error,{recurso:"error: "})
        }
    }

}
/* #endregion */




module.exports=Contenedor