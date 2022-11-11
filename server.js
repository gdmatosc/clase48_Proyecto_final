/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */ 

const express=require('express');
const session=require('express-session')
const app=express();

require('dotenv').config()

//const hostname = process.env.HOSTNAME;

const logd = require('./logging.js')
const modname='[server.js]'
const logr=logd.child({modulo:`${modname}`})

const RouterAdmin=require('./routes/routerAdmin')
const routerAdmin=new RouterAdmin()
const RouterAuth=require('./routes/routerAuthWeb')
const routerAuth=new RouterAuth()
const RouterClientes=require('./routes/routerClientes')
const routerClientes=new RouterClientes()


const { Server }=require("socket.io")
const http=require('http');
const server=http.createServer(app)
const io=new Server(server);


const passport=require('./model/passportAuth')
const path = require('path')


const {cpus}=require('os')
const cluster=require('cluster')
const process_PORT=process.env.PORT || parseInt(process.argv[2]) || 8081
const modoCluster=process.argv[3]=='CLUSTER'
const yargs=require('yargs')(process.argv.slice(2))
const argv=yargs
    .default({
        PORT: 8081,
        ruta: 'local'
    })
    .alias({
        p: 'PORT'
    })
    .boolean('admin')
    .argv

logr.info(argv.PORT,{recurso:'[Puerto]'})

/* #endregion */

//1.1.Control de Cluster
if (modoCluster && cluster.isPrimary){
    const numCPUs=cpus().length
    logr.warn(`Número de procesadores: ${numCPUs}`,{recurso:'numCPUs'})
    logr.warn(`PID MASTER: ${process.pid}`,{recurso:'process.pid'})
    
    for(let i=0; i<numCPUs;i++){
        cluster.fork()
    }

    cluster.on('exit',worker=>{
        logr.warn(`Worker ${worker.process.pid} died ${new Date().toLocaleString()}`,{recurso:'[process.pid]'})
        cluster.fork()
    })

}
//1.2.Implementación de servicios
else{

/* #region. 2.Recursos de web socket*/
const mensajesDBTest=[
    {id:1,nombre:"User 1",correo:"u1@company.com",edad:20,textoIngresado:"Iniciamos!"},
    {id:2,nombre:"User 2",correo:"u2@company.com",edad:21,textoIngresado:"Primero!"},
    {id:3,nombre:"User 3",correo:"u3@company.com",edad:22,textoIngresado:"Que empiece!"}
]

let messages=[]

let GetComentarios=()=>{
    const options = {
        host : 'localhost',
        port : argv.PORT,
        path: '/apiClientes/comentarios',
        method: 'GET'
    };
    // Sending the request
    const req = http.request(options, (res) => {
    let data = ''
    res.on('data', (chunk) => {
        data += chunk;
    });
    // Ending the response 
    res.on('end', () => {
        messages = JSON.parse(data);
  
    });
       
    }).on("error", (err) => {
    logr.error("Error: ", err)
    }).end()
            
} 

io.on('connection',(socket)=>{
    const loger=logd.child({modulo:`${modname}[io.on-connection]`})
    GetComentarios()
    socket.emit('messages',messages)
     loger.verbose(`User conectado con id: ${socket.id}`,{recurso:'socket.id'});
    let mensajesDBTemporal=messages
     loger.verbose('Usuario conectado socket inicial',{recurso:'na'})
    socket.on('new-message',data=>{
        const loger=logd.child({modulo:`${modname}[io.on-connection-socketOn_new-message]`})
        GetComentarios()
         loger.verbose("Recibido new-message",{recurso:'na'})
        dataJson=JSON.parse(data)
         loger.verbose(`DataSinId: ${dataJson}`,{recurso:'dataJson'})
        dataJson["id"]="1";
         loger.verbose(`DataConId: ${dataJson}`,{recurso:'dataJson'})
        mensajesDBTemporal.push(dataJson)
        io.sockets.emit('messages',mensajesDBTemporal);
         loger.verbose(`mensajesDBTemporal.new-message-fin: ${mensajesDBTemporal}`,{recurso:'mensajesDBTemporal'})
    });
    socket.on('new-message-delete',data=>{
        const loger=logd.child({modulo:`${modname}[io.on-connection-socketOn_new-message-delete]`})
        GetComentarios()
        mensajesDBTemporal=[]
        io.sockets.emit('messages',mensajesDBTemporal);
         loger.verbose(`mensajesDBTemporal.new-message-delete-fin: ${mensajesDBTemporal}`,{recurso:'mensajesDBTemporal'})
        
    });
    
})
/* #endregion */ 

/* #region. 3.Configuraciones de express, uso de EJS y rutas de APIs*/

//3.1.config. general de express
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname+'/public'))
//3.2.config. rutas de APIs
app.use('/apiClientes',routerClientes.start());
app.use('/apiOperaciones',routerAdmin.start());
//3.3.config. EJS
app.set('views','./views')
app.set('view engine','ejs')

/* #endregion */ 

/* #region. 4.Configuración general de passport*/

app.use(session({secret:'secret',resave:false,saveUninitialized:false,rolling:true,cookie:{maxAge:60000,secure:false,httpOnly:true}}))
app.use(passport.inicioAuth)
app.use(passport.sesionAuth)

/* #endregion */ 

/* #region. 5.Enrutamiento de autenticación y autorización*/

//5.1.Rutas de autenticación
app.use('/',routerAuth.start())
app.use('/login',routerAuth.start())
app.get('/signup',routerAuth.start())
app.post('/signup',routerAuth.start())
app.get('/user_data', routerAuth.start())
app.get('/failsignup',routerAuth.start())
app.get('/faillogin',routerAuth.start())
app.use('/logout',routerAuth.start())

//5.2.Rutas de autorización

app.use('/userProfile',routerAuth.start())
app.use('/uploadFile',routerAuth.start())

app.use('/productos',routerAuth.start())
app.use('/orden',routerAuth.start())
app.use('/chat',routerAuth.start())
app.use('/carrito',routerAuth.start())

app.use('/admin/config',routerAuth.start())
app.use('*',routerAuth.start())

/* #endregion */ 

/* #region. 6.Validación de logging*/

const loger=logd.child({modulo:`${modname}[Pruebas]`})
loger.info('Test Info message',{recurso:'[na]'});
loger.debug(`Test Debug: ${JSON.stringify({
    cookie: {path: '/',_expires: '2022-09-30T17:35:03.710Z',originalMaxAge: 60000,httpOnly: true,secure: false},
    passport: { user: 'yo' } })}`,{recurso:'[na]'});
loger.verbose('Test Verbose message',{recurso:'[na]'});
loger.warn(JSON.stringify('Test Warn message'),{recurso:'[na]'});
loger.error(JSON.stringify('Test Error message'),{recurso:'[na]'});


/* #endregion */ 

/* #region. 7.Iniciando servidor general*/
server.listen(process_PORT,()=>{
    logr.info(`Server desplegado en http://127.0.0.1:${process_PORT}`,{recurso:'[listen]'})
    logr.warn(`PID WORKER ${process.pid}`,{recurso:'[process.pid]'})
})
/* #endregion */ 

}

/* #region. Bloc*/


/* #endregion */ 



