const express=require('express')
const router=express.Router()
const PassportAuth=require('../model/passportAuth.js')
const logd = require('../logging.js')
const modname='[routerAuth.js]'
const logr=logd.child({modulo:`${modname}`})

const ControllerAuth=require('../controller/controllerAuthWeb.js')

class RouterAuth{
    constructor(){
        this.controllerAuth=new ControllerAuth()
    }

    start(){
       
        //logr.debug('inicio de start()',{recurso:'[na]'})
        router.get('/',this.controllerAuth.getRoot)
        router.get('/login',this.controllerAuth.getLogin)
        router.post('/login',PassportAuth.authLogin,this.controllerAuth.postLogin)
        router.get('/signup',this.controllerAuth.getSignup)
        router.post('/signup',PassportAuth.authSignup,this.controllerAuth.postSignup)
        router.get('/user_data', this.controllerAuth.getUserData)
        router.get('/failsignup',this.controllerAuth.getFailSignup)
        router.get('/faillogin',this.controllerAuth.getFailLogin)
        router.get('/logout',PassportAuth.checkAuthentication,this.controllerAuth.getLogout)

        router.get('/userProfile',PassportAuth.checkAuthentication,this.controllerAuth.getUserProfile)
        router.get('/chat',PassportAuth.checkAuthentication,this.controllerAuth.getChat)
        router.get('/productos',PassportAuth.noCheckAuthentication,this.controllerAuth.getProductos)
        router.get('/productos/:detalle',PassportAuth.noCheckAuthentication,this.controllerAuth.getProductosDetalle)
        router.get('/carrito',PassportAuth.noCheckAuthentication,this.controllerAuth.getCarrito)
        router.get('/orden',PassportAuth.noCheckAuthentication,this.controllerAuth.getOrden)
        router.post('/uploadFile',PassportAuth.checkAuthentication,this.controllerAuth.postUploadFile)

        router.get('/admin/config',PassportAuth.checkAuthentication,this.controllerAuth.getAdminConfig)
        
        router.get('*',PassportAuth.checkAuthentication,this.controllerAuth.getDefault)
        return router
    }


}

module.exports=RouterAuth

