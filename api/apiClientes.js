/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */ 

const comunicacionesFn=require('../comunicaciones.js')
const path = require('path')
const FactoryDAO=require('../model/daos/indexDAO.js')
const Productos=require('../model/models/productos.model.validar.js')
const DAO=FactoryDAO()

const logd = require('../logging.js')
const modname='[apiClientes.js]'
const logr=logd.child({modulo:`${modname}`})
let loger=logd.child({modulo:`${modname}[fn]`})
let emailNow=''
//logr.debug('fn()',{recurso:'[na]'})
//loger=logd.child({modulo:`${modname}[fn]`})
//loger.verbose(i,{recurso:"i:"})

/* #endregion */ 



class ApiClientes{
    constructor(){
        this.coms=comunicacionesFn
    }
    
    /* #region. 2.Chat*/

    async obtenerComentariosTodos(){
        logr.debug('obtenerComentariosTodos()',{recurso:'[na]'})
        return await DAO.chatGeneral.getAll();
    }

    async guardarComentarios(dataBody){
        logr.debug('guardarComentarios',{recurso:'[na]'})
        return await DAO.chatGeneral.save(dataBody);
    }

    async borrarComentariosTodos(){
        logr.debug('borrarComentariosTodos',{recurso:'[na]'})
        return await DAO.chatGeneral.deleteAll()
    }

    /* #endregion */

    /* #region. 3.Productos*/

    async obtenerObjetosTodos(){
        logr.debug('obtenerObjetosTodos()',{recurso:'[na]'})
        return await DAO.productosGeneral.getAll();
    }

    async obtenerObjetosDetalle(detalle,email){
        emailNow=email
        let categorias=['periferico','comunicaciones','electrico']
        let index = categorias.findIndex((i) => i == detalle)
        let fieldParametro=''
        let fieldValor=''
        const pattern = /\d{4}/
          console.log("[apiClientes.js][obtenerObjetosDetalle()] (msg) detalle: ",detalle)
          console.log("[apiClientes.js][obtenerObjetosDetalle()] (msg) index: ",index) //debug
        if (index>=0){
            console.log("[apiClientes.js][obtenerObjetosDetalle()] (msg) (inicio de if index)")
            fieldParametro='categoria'
            fieldValor=detalle
        }else if (pattern.test(detalle)){
            console.log("[apiClientes.js][obtenerObjetosDetalle()] (msg) (inicio del else if)")
            fieldParametro='id'
            fieldValor=detalle
        }else{
            console.log("[apiClientes.js][obtenerObjetosDetalle()] (msg) (inicio del else final)")
            //return res.status(400).send({error: `No ha ingresado un busqueda valida`})
            //return {message:`No ha ingresado un busqueda valida`}
            //throw new Error(`No ha ingresado un busqueda valida`)

            // const {error}=ProductoSchema.validate(producto)
            // logr.warn(error,{recurso:'[error]'})
            // if(error){
            //     throw error
            // }
            //return path.resolve(__dirname, '../public')+'/login.html'
            throw {error:`No ha ingresado un busqueda valida`}
        }
        
        let resultado=await DAO.productosGeneral.getByField(fieldParametro,fieldValor)
        logr.debug(resultado,{recurso:'[obtenerObjetosDetalle()][na]'})
        return resultado
    }

    async guardarObjetos(dataBody){
        logr.debug('guardarObjetos',{recurso:'[na]'})
        dataBody.precio=Number(dataBody.precio);
        // if(!dataBody.nombre || !dataBody.img || !dataBody.precio){
        //     return res.status(400).send({error: `Los datos están incompletos ahora: ${req.body}`});
        // }
        ApiClientes.asegurarObjetoValida(dataBody,true)
        return await DAO.productosGeneral.save(dataBody)
    }

    async borrarObjeto(id){
        logr.debug('borrarObjeto',{recurso:'[na]'})
        await DAO.productosGeneral.deleteById(id)
        return {message:`El producto con id ${id} de un file se borró exitosamente`}
    }

    async borrarObjetosTodos(){
        logr.debug('borrarObjetosTodos',{recurso:'[na]'})
        return await DAO.productosGeneral.deleteAll()
    }

    /* #endregion */

    /* #region. 4.Carrito*/

    async obtenerObjetosCarritosTodos(){
          loger=logd.child({modulo:`${modname}[obtenerObjetosCarritosTodos()]`})
          //loger.verbose(i,{recurso:"i:"})
          loger.verbose('inicio',{recurso:"[na]"})
        let objetosCarritosTodos=await DAO.carritoProductos.getAll()
          loger.verbose(objetosCarritosTodos,{recurso:"objetosCarritosTodos:"})
          loger.verbose(objetosCarritosTodos.length,{recurso:"objetosCarritosTodos.length:"})
        return objetosCarritosTodos[0]
    }

    async guardarObjetosCarritosTodos(product){
        loger=logd.child({modulo:`${modname}[guardarObjetosCarritosTodos()]`})
        //loger.verbose(i,{recurso:"i:"})
          loger.verbose('inicio',{recurso:"[]"})
        const cartAlias='unico'
        const cart=await DAO.carritoProductos.getById(cartAlias)
        let productosCarrito=cart.products
        let newObj={}
        if(cart.length!==0){  
            
              loger.verbose(product.nombre,{recurso:"product.nombre:"})
              loger.verbose(productosCarrito,{recurso:"productosCarrito:"})
            let index = productosCarrito.findIndex(i => i.nombre == product.nombre)
              loger.verbose(index,{recurso:"index:"})
            if (index>=0){
                  loger.verbose('inicio del if(index)',{recurso:"[na]"})
                let productocarritoFilter=productosCarrito.filter(item => item.nombre == product.nombre)
                  loger.verbose(productosCarrito[index].cantidad,{recurso:"[if(index)] productosCarrito[index].cantidad: "})
                  loger.verbose(productocarritoFilter[0].cantidad,{recurso:"[if(index)] productocarritoFilter[0].cantidad: "})
                productosCarrito[index].cantidad=productocarritoFilter[0].cantidad+product.cantidad
            }else{
                  loger.verbose('en else',{recurso:"[na]"})
                productosCarrito.push(product)
            }
              loger.verbose(cart,{recurso:"[post conditions]cart:"})
            newObj=await DAO.carritoProductos.editByBody(cart)
              loger.verbose(newObj,{recurso:"newObj:"})
        }
        else {
            cart.alias=cartAlias
            cart.fechaHora=new Date().toLocaleString()
            cart.email=emailNow
              loger.verbose(emailNow,{recurso:"[en else de if(cart.length!==0)] emailNow:"})
            cart.products=[]
              loger.verbose(cart,{recurso:"[en else de if(cart.length!==0)] (cart_inicial) cart:"})
            cart.products.push(product)
              loger.verbose(cart,{recurso:"[en else de if(cart.length!==0)] (cart_after_push) cart:"})
            newObj=await DAO.carritoProductos.save(cart)
              loger.verbose(newObj,{recurso:"newObj:"})
        }
            return newObj
    }

    async borrarObjetoCarritosTodos(product){
        logr.debug('[borrarObjetoCarritosTodos()]',{recurso:'[na]'})
        return await DAO.carritoProductos.deleteByBody(product)
    }

    async borrarCarrito(){
      logr.debug('[borrarCarrito()]',{recurso:'[na]'})
      return await DAO.carritoProductos.deleteAll()
    }

    /* #endregion */

    /* #region. 5.Orden*/
    
    async obtenerObjetosOrdenTodos(){
        loger=logd.child({modulo:`${modname}[obtenerObjetosOrdenTodos()]`})
        //loger.verbose(i,{recurso:"i:"})
        loger.verbose('inicio',{recurso:"[na]"})
        let datosOrdenProductos=await DAO.ordenProductos.getAll()
        loger.verbose(datosOrdenProductos,{recurso:"[datosOrdenProductos]"})
        return datosOrdenProductos
    }

    async guardarObjetosOrdenTodos(dataBody){
        logr.debug('guardarObjetosOrdenTodos',{recurso:'[na]'})
        return await DAO.ordenProductos.save(dataBody);
    }

    async obtenerObjetosOrden(){
        logr.debug('obtenerObjetosOrden()',{recurso:'[na]'})
        return await DAO.ordenProductos.getAll();
    }

    async guardarObjetosOrden(dataBody){
        logr.debug('guardarObjetosOrden',{recurso:'[na]'})
        return await DAO.ordenProductos.save(dataBody);
    }

    async obtenerDetalleUsuario(email){
      emailNow=email
    }
    /* #endregion */  

    static asegurarObjetoValida(objeto,requerido){
        try{
            Productos.validar(objeto,requerido)
        }catch(error){
            throw new Error(`el producto posee un formato json invalido o faltan datos: (detalles) ${error.details[0].message}`)
        }
    }

}

module.exports=ApiClientes