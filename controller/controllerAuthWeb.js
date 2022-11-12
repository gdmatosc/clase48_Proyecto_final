/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */ 

const ApiAuth=require('../api/apiAuthWeb.js')
const ApiClientes=require('../api/apiClientes.js')
const PassportAuth=require('../model/passportAuth.js')
const formidable = require("formidable")
const path = require('path')

const logd = require('../logging.js')
const modname='[controllerAuth.js]'
const logr=logd.child({modulo:`${modname}`})

/* #endregion */ 



class ControllerAuth{
constructor(){
    this.apiAuth=new ApiAuth()
    this.apiClientes=new ApiClientes()
    this.form = new formidable.IncomingForm()
}

/* #region. 2.Authentication general */

getRoot=(req,res)=>{
    let web= this.apiAuth.getPublic()
    
    logd.verbose(web,{recurso:"(pruebas en try)[web]"})
    
    res.sendFile(web)
}

getLogin=(req,res)=>{
    const loger=logd.child({modulo:`${modname}[getLogin]`})
    loger.debug(req.isAuthenticated(),{recurso:'(antes del if req.isAuthenticated())[req.isAuthenticated()]'})
    if(req.isAuthenticated()){
        loger.debug('(inicio if req.isAuthenticated())',{recurso:'[na]'})
        const user=req.user
        this.usernameLocal=req.user.username
        let username=req.user.username
        let name=req.user.name
        let email=req.user.email
        let address=req.user.address
        let age=req.user.age
        let telephone=req.user.telephone
        let webAuth= this.apiAuth.getLogin(username,name,email,address,age,telephone)
        logd.verbose(webAuth,{recurso:"(pruebas en try)[webAuth]"})
        res.render('productos',webAuth)
    }else{
        loger.debug('(inicio else req.isAuthenticated())',{recurso:'[na]'})
        let webNoAuth= this.apiAuth.getPublic('Login')
        res.sendFile(webNoAuth)
    }
}

postLogin=async (req,res)=>{
     const loger=logd.child({modulo:`${modname}[postLogin]`})
    // loger.debug('(antes de this.passportAuth.authLogin)',{recurso:'[na]'})
    loger.debug(req.isAuthenticated(),{recurso:'(despues de this.passportAuth.authLogin)[req.isAuthenticated()]'})

    if(req.isAuthenticated()){
        
        loger.info(JSON.stringify(req.user),{recurso:'[req.user]'})
        loger.debug(JSON.stringify(req.session),{recurso:'[req.session]'})
        loger.info(JSON.stringify(req.user.username),{recurso:'[req.user.username]'});
        let username=req.user.username
        let name=req.user.name
        let email=req.user.email
        let address=req.user.address
        let age=req.user.age
        let telephone=req.user.telephone
        await this.apiClientes.obtenerDetalleUsuario(email) 
        let web= this.apiAuth.postLogin(username,name,email,address,age,telephone)
        loger.debug(web,{recurso:'(en if justo antes del res.render(web))[web]'})
        res.render('productos',web)
    }
}

getLogout=(req,res)=>{
    let username=req.user.username
    req.session.destroy()
    let web= this.apiAuth.getLogout(username)
    return res.render('logout',web)
}

getSignup=(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../public')+'/signup.html')
}

postSignup=(req,res)=>{
    console.log("req.user.postSignup.RoutesJS",req.user)
    let username=req.user.username
    let name=req.user.name
    let email=req.user.email
    let address=req.user.address
    let age=req.user.age
    let telephone=req.user.telephone
    res.render('userProfile',{username,name,email,address,age,telephone})
}

getUserData=(req,res)=>{
    if (req.user === undefined) {
        // El usuario no se ha logueado
        res.json({});
    } else {
        res.json({
            username: req.user
        });
    }
}

getFailSignup=(req,res)=>{
    res.write('Error: El usuario ya existe');
    res.end();
}

getFailLogin=(req,res)=>{
    res.write('Error: El usuario o password es invalido');
    res.end();
}

 /* #endregion */

/* #region. 3.Authorization clientes */

getUserProfile=(req,res)=>{
    const loger=logd.child({modulo:`${modname}[get-userProfile]`})
    loger.verbose(req,{recurso:"[req]"})
    loger.verbose(req.session,{recurso:"[req.session]"})
    let username=req.user.username
    let name=req.user.name
    let email=req.user.email
    let address=req.user.address
    let age=req.user.age
    let telephone=req.user.telephone
    loger.verbose(username,{recurso:"[username]"})
    if(!username) return res.redirect('/login')
    let web= this.apiAuth.getUserProfile(username,name,email,address,age,telephone)
    return res.render('userProfile',web)
}

getChat=(req,res)=>{
    //logr.verbose(req.session);
    const loger=logd.child({modulo:`${modname}[get-Chat]`})
    let username=req.user.username
    loger.verbose(username,{recurso:"[username]"})
    let web= this.apiAuth.getChat(username)
    return res.render('chat.ejs',web)
}

getProductos=async (req,res)=>{
    //logr.verbose(req.session);
    const loger=logd.child({modulo:`${modname}[get-productos]`})
    //let username=req.user.username
    let username=req.user ? req.user.username : 'anonimo'
    let emailUser=req.user ? req.user.email : 'admin@electro-te'
    await this.apiClientes.obtenerDetalleUsuario(emailUser) 
    loger.verbose(username,{recurso:"[reqSessionUsername]"})
    let web= this.apiAuth.getProductos(username)
    return res.render('productos.ejs',web)
}

getProductosDetalle=async (req,res)=>{
    
    try{
        //logr.verbose(req.session);
        let resultado=[{"nombre":"MOUSE","descripcion":"COLOR AZUL OSCURO","promocion":"GARANTIA 5 MESES","img":"/img/periferico_mouse.jpg","precio":10,"id":1},{"nombre":"AUDIFONO","descripcion":"COLOR BLANCO","promocion":"GARANTIA 5 MESES","img":"/img/periferico_audifono.jpg","precio":30,"id":2}]
        const loger=logd.child({modulo:`${modname}[get-productos]`})
        //let username1=req.user.username
        let username=req.user ? req.user.username : 'anonimo'
        let emailUser=req.user ? req.user.email : 'admin@electro-te'
        loger.verbose(username,{recurso:"[getProductosDetalle] req.user.username: "})
        let web= this.apiAuth.getProductosDetalle(username)
        let detalle=req.params.detalle
        let objetosDetalle=await this.apiClientes.obtenerObjetosDetalle(detalle,emailUser) 
        return res.render('productosDetalle.ejs',{username:username,productDatos:objetosDetalle})
    }
    catch(error){
        logr.warn(error,{recurso:'[getproductosDetalle()][error]'})
        res.write('El producto no existe')
        res.end()
    }
    
}

getCarrito=(req,res)=>{
    const loger=logd.child({modulo:`${modname}[get-Carrito]`})
    let username=req.user ? req.user.username : 'anonimo'
    loger.verbose(username,{recurso:"[reqSessionUsername]"})
    let web= this.apiAuth.getCarrito(username)
    return res.render('carrito.ejs',web)
}

getOrden=(req,res)=>{
    const loger=logd.child({modulo:`${modname}[get-Orden]`})
    let username=req.user ? req.user.username : 'anonimo'
    loger.verbose(username,{recurso:"[reqSessionUsername]"})
    let web= this.apiAuth.getOrden(username)
    return res.render('Orden.ejs',web)
}

postUploadFile=(req, res) => {
    //basic setup
    const loger=logd.child({modulo:`${modname}[post-api/uploadFile`})
    const uploadFolder = path.resolve(__dirname, '../public')+'/imgUser'
    loger.verbose(uploadFolder,{recurso:"[uploadFolder]"})
    //basic configuration
    this.form.uploadDir = uploadFolder
      loger.verbose(JSON.stringify(this.form),{recurso:"[this.form]"})
    //parsing
    
    let apiAuthForm=this.apiAuth
    this.form.parse(req, function (err, fields, files) {
        loger.verbose(fields,{recurso:"[fields]"})
        loger.verbose(JSON.stringify(files),{recurso:"[files]"})
        const file = files.myFile;
        let fileUpload= apiAuthForm.postUploadFile(uploadFolder,file)

        if (err) {
            loger.warn(`Error en sección parsing: ${err}`,{recurso:'[error]'})
            return res.status(400).json({status: "Fail",message: "There was an error parsing the files",error: err,})
          }

        else {
            loger.verbose(JSON.stringify(file),{recurso:"[file]"})
            // actualizar nombre del archivo
            loger.verbose(file.originalFilename,{recurso:"[file.originalFilename]"})
            try {
                res.write(fileUpload);
                res.end();
            } catch (error) {
                loger.warn(`Error en sección update name: ${error}`,{recurso:'[error]'});
            }
        }
      });
  };

 /* #endregion */

/* #region. 4.Authorization Admin */

getAdminConfig=(req,res)=>{
    let username=req.user.username
    let dato1='pruebas'
    let id_proceso=process.pid
    let nombre_plataforma=process.platform
    let version_node=process.version
    let carpeta_proyecto=process.cwd()
    let path_ejecucion=process.execPath
    let memoria_reservada=process.memoryUsage.rss()
    let argumentos_entrada=process.execArgv
    logr.verbose(username,{recurso:"reqSessionUsername.appGet"})
    let web= this.apiAuth.getAdminConfig(username,id_proceso,nombre_plataforma,version_node,carpeta_proyecto,path_ejecucion,memoria_reservada,argumentos_entrada)
    return res.render('adminConfig.ejs',web)
}

getDefault= (req, res)=> {
    const loger=logd.child({modulo:`${modname}[get-Ruta-Default]`})
    let ruta=req.path
    loger.warn(ruta,{recurso:"[path]"})
    let web= this.apiAuth.getDefault()
    res.send(web);
}

 /* #endregion */


}

module.exports=ControllerAuth
