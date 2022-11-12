/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */ 

const ApiClientes=require('../api/apiClientes.js')
const fnCom=require('../comunicaciones')
const FactoryDAO=require('../model/daos/indexDAO.js')
const DAO=FactoryDAO()

const logd = require('../logging.js')
const modname='[controllerClientes.js]'
const logr=logd.child({modulo:`${modname}`})
let loger=logd.child({modulo:`${modname}[fn]`})
//logr.debug('fn()',{recurso:'[na]'})
//loger=logd.child({modulo:`${modname}[fn]`})
//loger.verbose(i,{recurso:"i:"})

/* #endregion */ 


class ControllerClientes{
constructor(){
    this.apiClientes=new ApiClientes()
}

/* #region. 2.Chat*/

obtenerComentariosTodos= async (req, res) => {
    try{
        let comentariosTodos=await this.apiClientes.obtenerComentariosTodos() 
        //console.log("contenedorVar.comentariosMongoDB.routerGet",contenedorVar)//debug
        res.json(comentariosTodos)

    }catch(error){
        logr.warn(error,{recurso:'[obtenerObjetosTodos()][error]'})
        throw error
    }
    
};

guardarComentarios=async (req,res)=>{
    try{
        const dataBody=req.body;
        let comentariosGuardados=await this.apiClientes.guardarComentarios(dataBody)
        //console.log("username-text.comentariosFile.routerPost",dataBody)//debug
        res.send("Guardado")
    }catch(error){
        logr.warn(error,{recurso:'[obtenerObjetosTodos()][error]'})
        throw error
    }
    
}

borrarComentariosTodos=async(req,res)=>{
    try{
        let comentariosTodosBorrados=await this.apiClientes.borrarComentariosTodos()
        res.json(comentariosTodosBorrados)
        //console.log("borradoTotal.comentariosFile.routerDelete")//debug
    }catch(error){
        logr.warn(error,{recurso:'[obtenerObjetosTodos()][error]'})
        throw error
    }
    
}

/* #endregion */

/* #region. 3.Productos*/

obtenerObjetosTodos=async (req, res) => {
    try{
        let objetosTodos=await this.apiClientes.obtenerObjetosTodos() 
        //logr.debug(objetosTodos,{recurso:'[obtenerObjetosTodos()][objetosTodos]'})
        res.json(objetosTodos)
    }
    catch(error){
        logr.warn(error,{recurso:'[obtenerObjetosTodos()][error]'})
        throw error
    }
    
}

obtenerObjetosDetalle=async (req, res) => {
    try{
        let detalle=req.params
        let objetosTodos=await this.apiClientes.obtenerObjetosDetalle(detalle) 
        //logr.debug(objetosTodos,{recurso:'[obtenerObjetosTodos()][objetosTodos]'})
        res.json(objetosTodos)
    }
    catch(error){
        logr.warn(error,{recurso:'[obtenerObjetosDetalle()][error]'})
        throw error
    }
    
}

guardarObjetos=async (req,res)=>{
    try {
        let dataBody=req.body;
        let objetosGuardados=await this.apiClientes.guardarObjetos(dataBody)
        //console.log("req.bodyPost.objetosFile.RouterPost",req.body) //debug
        res.send("Guardado.routerObjetosPostFile")
    }
    catch(error){
        logr.warn(error,{recurso:'[guardarObjetos()][error]'})
        throw error
    }
    
}

borrarObjeto=async(req,res)=>{
    try{
        const {id}=req.params;
        let objetoBorrado=await this.apiClientes.borrarObjeto(id)
        //console.log("req.paramas.apiClientes.delete",req.params)//debug        
        res.send(objetoBorrado)
    }
    catch(error){
        logr.warn(error,{recurso:'[borrarObjeto()][error]'})
        throw error
    }
}

borrarObjetosTodos=async(req,res)=>{
    try{
        let objetosTodosBorrados=await this.apiClientes.borrarObjetosTodos()
        res.json(objetosTodosBorrados)
        //console.log("borradoTotal.objetosFile.routerDelete")//debug
    }
    catch(error){
        logr.warn(error,{recurso:'[borrarObjetosTodos()][error]'})
        throw error
    }
    
}

/* #endregion */

/* #region. 4.Carrito*/

obtenerObjetosCarritosTodos=async(req,res)=>{
    try{
        loger=logd.child({modulo:`${modname}[obtenerObjetosCarritosTodos()]`})
        //loger.verbose(i,{recurso:"i:"})
        loger.verbose('inicio',{recurso:"[na]"})
        let objetosCarritosTodos=await this.apiClientes.obtenerObjetosCarritosTodos()
          loger.verbose(objetosCarritosTodos,{recurso:"objetosCarritosTodos:"})
        res.json(objetosCarritosTodos)
    }catch(error){
        logr.warn(error,{recurso:'[obtenerObjetosTodos()][error]'})
        throw error
    }
      
}

guardarObjetosCarritosTodos=async(req,res)=>{
    try{
        let product=req.body
        //console.log("producto ingresado: ",product) //debug
        let objetosCarritoGuardados=await this.apiClientes.guardarObjetosCarritosTodos(product) 
        res.json(objetosCarritoGuardados)
    }catch(error){
        logr.warn(error,{recurso:'[obtenerObjetosTodos()][error]'})
        throw error
    }
    
}


borrarObjetoCarritosTodos=async(req,res)=>{
    try{
        let product=req.body
        let objetosCarritoBorrados=await this.apiClientes.borrarObjetoCarritosTodos(product)
        res.json(objetosCarritoBorrados)
        
    }catch(error){
        logr.warn(error,{recurso:'[obtenerObjetosTodos()][error]'})
        throw error
    }
}

borrarCarrito=async(req,res)=>{
    try{
        let objetosCarritoBorrados=await this.apiClientes.borrarCarrito()
        //console.log("product.cartID,id: ",product) //debug
        res.json(objetosCarritoBorrados)
        
    }catch(error){
        logr.warn(error,{recurso:'[obtenerObjetosTodos()][error]'})
        throw error
    }
}

/* #endregion */

/* #region. 5.Orden*/

obtenerObjetosOrdenTodos=async(req,res)=>{
    try{
        loger=logd.child({modulo:`${modname}[obtenerObjetosOrdenTodos()]`})
        //loger.verbose(i,{recurso:"i:"})
        loger.verbose('inicio',{recurso:"[na]"})
      let objetosOrdenTodos=await this.apiClientes.obtenerObjetosOrdenTodos()
        loger.verbose(objetosOrdenTodos,{recurso:"objetosOrdenTodos:"})
      res.json(objetosOrdenTodos)
    }catch(error){
        logr.warn(error,{recurso:'[obtenerObjetosTodos()][error]'})
        throw error
    }
      
   
}

guardarObjetosOrdenTodos=async(req,res)=>{
    try{
        let product=req.body
        //console.log("producto ingresado: ",product) //debug
        let objetosOrdenGuardados=await this.apiClientes.guardarObjetosOrdenTodos(product) 
        res.json(objetosOrdenGuardados)
    }catch(error){
        logr.warn(error,{recurso:'[obtenerObjetosTodos()][error]'})
        throw error
    }
    
}

obtenerObjetosOrden=async(req,res)=>{
    try{
        loger=logd.child({modulo:`${modname}[obtenerObjetosOrden()]`})
        //loger.verbose(i,{recurso:"i:"})
        loger.verbose('inicio',{recurso:"[]"})
      const {id}=req.params;
      let objetosOrden=await this.apiClientes.obtenerObjetosOrden(id)
        loger.verbose(objetosOrden,{recurso:"objetosOrden:"})
      res.json(objetosOrden)
    }catch(error){
        logr.warn(error,{recurso:'[obtenerObjetosTodos()][error]'})
        throw error
    }
      
}

guardarObjetosOrden=async(req,res)=>{
    try{
        let product=req.body
        //console.log("producto ingresado: ",product) //debug
        const cartID=req.params.id
        //console.log("cartID: ",cartID) //debug
        let objetosOrdenGuardados=await this.apiClientes.guardarObjetosOrden(cartID,product) 
        res.json(objetosOrdenGuardados)
    }catch(error){
        logr.warn(error,{recurso:'[obtenerObjetosTodos()][error]'})
        throw error
    }
   
}

/* #endregion */

}

module.exports=ControllerClientes