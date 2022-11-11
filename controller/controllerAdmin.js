
const ApiAdmin=require('../api/apiAdmin.js')
const fnCom=require('../comunicaciones')
//const procAdminEmail=process.env.ADMIN_EMAIL

const logd = require('../logging.js')
const modname='[controllerAdmin.js]'
const logr=logd.child({modulo:`${modname}`})

class ControllerAdmin{
constructor(){
    this.apiAdmin=new ApiAdmin()
}


ejecutarNotificacion=(req, res) => {
    const dataBody=req.body;
    let notificacionEjecutada= this.apiAdmin.ejecutarNotificacion(dataBody)
    res.send(notificacionEjecutada)
   
}

}

module.exports=ControllerAdmin