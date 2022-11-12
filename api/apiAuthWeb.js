/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */ 

const comunicacionesFn=require('../comunicaciones.js')
const path = require('path')
const fs=require('fs')
const fnCom=require('../comunicaciones')

const logd = require('../logging.js')
const modname='[apiAuthWeb.js]'
const logr=logd.child({modulo:`${modname}`})

/* #endregion */ 

class ApiAuth{
    constructor(){
        this.coms=comunicacionesFn
    }

    /* #region. 2.Authentication general */

    getPublic(target){
        switch(target){
            case 'Login': return path.resolve(__dirname, '../public')+'/login.html'
            case 'Signup': return path.resolve(__dirname, '../public')+'/signup.html'
            default: return path.resolve(__dirname, '../public')+'/index.html'
        }
    }
    getLogin(username,name,email,address,age,telephone){
        logr.debug({username,name,email,address,age,telephone},{recurso:'[getlogin][username,name,email,address,age,telephone]'})
        return {username,name,email,address,age,telephone}
    }

    postLogin(username,name,email,address,age,telephone){
        logr.debug('[postLogin]',{recurso:'[na]'})
        fnCom.currentUser(username)
        fnCom.currentUserTelephone(telephone)
        return {username,name,email,address,age,telephone}
    }

    getLogout(username){
        logr.debug('[getLogout]',{recurso:'[na]'})
        return {username}
    }

    getSignup(){

    }
    postSignup(){

    }
    getUserData(){

    }
    getFailsignup(){

    }
    getFaillogin(){
        
    }

    /* #endregion */

    /* #region. 3.Authorization clientes */

    getUserProfile(username,name,email,address,age,telephone){
        logr.debug('[getUserProfile]',{recurso:'[na]'})
        return {username,name,email,address,age,telephone}
    }

    getChat(username){
        logr.debug('[getChat]',{recurso:'[na]'})
        return {username}
    }

    getProductos(username){
        logr.debug('[getProductos]',{recurso:'[na]'})
        return {username}
    }

    getProductosDetalle(username){
        logr.debug('[getProductosDetalle]',{recurso:'[na]'})
        return {username}
    }

    getCarrito(username){
        logr.debug('[getCarrito]',{recurso:'[na]'})
        return {username}
    }

    getOrden(username){
        logr.debug('[getOrden]',{recurso:'[na]'})
        return {username}
    }

    postUploadFile(uploadFolder,file){
        const loger=logd.child({modulo:`${modname}[uploadFile`})
        logr.debug('[postUploadFile]',{recurso:'[na]'})
        loger.verbose(file.filepath,{recurso:"[file.filepath]"})
        //const fileType = '.'+file.mimetype.split("/").pop();
        const fileName = 'avatar1'+'.'+file.mimetype.split("/").pop();
        loger.verbose(fileName,{recurso:"[fileName]"})
        fs.renameSync(file.filepath, path.join(uploadFolder, fileName));
        return 'File uploaded'
    }


    /* #endregion */

    /* #region. 4.Authorization Admin */
    getAdminConfig(username,username_mongodb,tipo_persistencia,url_mongodb,mail_admin){
        logr.debug('[getOperacionesInfo]',{recurso:'[na]'})
        return {username,username_mongodb,tipo_persistencia,url_mongodb,mail_admin}
    }

    getDefault(){
        logr.debug('[getDefault]',{recurso:'[na]'})
        return '<h1>la ruta no existe</h1>'
    }

    
    /* #endregion */
    
}

module.exports=ApiAuth