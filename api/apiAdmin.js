const comunicacionesFn=require('../comunicaciones.js')
const fnCom=require('../comunicaciones')
const procAdminEmail=process.env.ADMIN_EMAIL
const path = require('path')

const logd = require('../logging.js')
const modname='[apiAdmin.js]'
const logr=logd.child({modulo:`${modname}`})


class ApiAdmin{
    constructor(){
        this.coms=comunicacionesFn
    }
    
    ejecutarNotificacion(dataBody){
        logr.debug('ejecutarNotificacion',{recurso:'[na]'})
        fnCom.nodemailer('compraNew',procAdminEmail,dataBody)
        fnCom.twilio_sms_client()
        fnCom.twilio_whs_admin()
        return "Enviado"
    }


}

module.exports=ApiAdmin