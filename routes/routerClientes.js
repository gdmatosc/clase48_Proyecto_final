const express=require('express')
const router=express.Router()
const logd = require('../logging.js')
const modname='[routerClientes.js]'
const logr=logd.child({modulo:`${modname}`})

const ControllerClientes=require('../controller/controllerClientes.js')

class RouterClientes{
    constructor(){
        this.controllerClientes=new ControllerClientes()
    }

    start(){
        //logr.debug('inicio de start()',{recurso:'[na]'})
        router.get('/comentarios',this.controllerClientes.obtenerComentariosTodos)
        router.post('/comentarios',this.controllerClientes.guardarComentarios)
        router.delete('/comentarios',this.controllerClientes.borrarComentariosTodos)

        router.get('/objetos',this.controllerClientes.obtenerObjetosTodos)
        router.get('/objetos/:detalle',this.controllerClientes.obtenerObjetosDetalle)
        router.post('/objetos',this.controllerClientes.guardarObjetos)
        router.delete('/objetos',this.controllerClientes.borrarObjetosTodos)
        router.delete('/objetos/:id',this.controllerClientes.borrarObjeto)

        router.get('/objetosCarrito',this.controllerClientes.obtenerObjetosCarritosTodos)
        router.post('/objetosCarrito',this.controllerClientes.guardarObjetosCarritosTodos)
        router.delete('/objetosCarrito',this.controllerClientes.borrarObjetoCarritosTodos)
        router.delete('/carrito',this.controllerClientes.borrarCarrito)
        
        router.get('/objetosOrden',this.controllerClientes.obtenerObjetosOrdenTodos)
        router.post('/objetosOrden',this.controllerClientes.guardarObjetosOrdenTodos)

        return router
    }


}

module.exports=RouterClientes