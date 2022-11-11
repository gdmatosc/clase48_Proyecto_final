const express=require('express')
const router=express.Router()
const logd = require('../logging.js')
const modname='[routerAdmin.js]'
const logr=logd.child({modulo:`${modname}`})

const ControllerAdmin=require('../controller/controllerAdmin.js')

class RouterAdmin{
    constructor(){
        this.controllerAdmin=new ControllerAdmin()
    }

    start(){
        router.post('/notificacion',this.controllerAdmin.ejecutarNotificacion)
        return router
    }


}

module.exports=RouterAdmin