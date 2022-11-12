const dotenv=require('dotenv')
const path = require('path')
//Esta configuración es sólo de referencia por seguridad
//ya que se requiere que se suba los archivos .env el cual contiene contraseñas
//por ejemplo Twilio busca automáticamente si se están exponiendo sus token en github y deshabilitan las cuentas en horas
//por seguridad solo se está usando un .env que no se sube a github, esto se puede ver en el gitignore

//todos estos datos se configuran manualmente en las variables de entorno del proveedor de infraestructura
//los proveedores de infraestructura usados son Heroku y Render
//no se coloca el puerto porque el proveedor de infraestructura lo configura automáticamente

//no se ha habilitado la opción de envio de correos desde gmail por seguridad general ya que si se llega a descubrir el password
//se puede enviar correos a cualquier lugar
//Entonces se ha usado una cuenta de Etheral, se muestra su password  para que verifique que se puede enviar correos al admin

dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV+'.env')
})

NODE_ENV=process.env.NODE_ENV || 'development'
HOSTNAME=process.env.HOSTNAME || '0.0.0.0'
ADMIN_EMAIL=process.env.ADMIN_EMAIL || 'tom85@ethereal.email'
NODEMAILER_PASS=process.env.NODEMAILER_PASS || 'XVPKnv2QfVP63XcaMs'
ADMIN_PHONE=process.env.ADMIN_PHONE
TWILIO_ACCOUNTSSID=process.env.TWILIO_ACCOUNTSSID
TWILIO_AUTHTOKEN=process.env.TWILIO_AUTHTOKEN
MONGO_USERNAME=process.env.MONGO_USERNAME || 'gmatosc'
MONGO_PASSWORD=process.env.MONGO_PASSWORD
MONGO_URL=process.env.MONGO_URL || 'cdb-nosql-test1.p8ubd58.mongodb.net/test1MongoCDB?retryWrites=true&w=majority'
//MONGOCloud-MONGOLocal
TIPO_PERSISTENCIA=process.env.TIPO_PERSISTENCIA || 'mongoCDB'

module.exports={
    NODE_ENV,
    HOSTNAME,
    ADMIN_EMAIL,
    NODEMAILER_PASS,
    ADMIN_PHONE,
    TWILIO_ACCOUNTSSID,
    TWILIO_AUTHTOKEN,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_URL,
    TIPO_PERSISTENCIA,
}