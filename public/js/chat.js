/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */ 

const socket=io.connect();
//const element1=document.getElementById('form1ro')
//const element2=document.getElementById('form2do') <img src="./img/icon_48px_man1.png" style='width:40px;'>
console.log('socket ui')
let usuarioElegidoID=1
let textoIn=''

const usuariosGenericos=[
    {id:1,tipo:"Usuario",email:"usuario@gmail.com", edad:25,thumbnail:"./img/icon_48px_man1.png"},
    {id:2,tipo:"Sistema",email:"sistema@electro-te.com", edad:27,thumbnail:"./img/icon_48px_man2.png"},
]
/* #endregion */ 

/* #region. 2.Imprimir mensajes de socket en los div id:messages, id:messages1*/
//Recepción de datos del socket
imprimirMensajes()
function imprimirMensajes(){
    socket.on('messages',(messages)=>{
        console.log('mensajes.socket.cliente.recibido.JS',messages);
        render(messages);
    }) 
}


//Función render
const render=(data)=>{
    const html=data.map((element,index)=>{
        return(`
            <div class="contenedorChatRespuesta">
                <strong >${element.email}</strong>
                <strong >[${element.fechaHora}]</strong>: 
                <em >${element.cuerpoMensaje} </em>
                <img src=${element.thumbnail} style='width:40px;'>
            </div>
        `)
    }).join('');
    document.getElementById('messages').innerHTML=html;
}
//Recepción de datos del socket
/*socket.on('messages',(messages)=>{
    console.log(messages);
    render2(messages);
}) */

/* #endregion */ 

/* #region. 3.Impresiones de pantalla con funciones de soporte*/
imprimirSelect()
imprimirInputs()
imprimirBotonEnvio()

function imprimirSelect(){
    let html=`
    <br>
    <div class="containerVirtualForm">
    <label>Tipo:</label>
    `
    html+="<select name='userSelect' id='userSelect' onchange='loadTipoSelect()'>"
    for (const usuarioB of usuariosGenericos){
            html+=`
            <option value=${usuarioB.id}>${usuarioB.tipo}</option>
            `
    }
    html+="</select>"  
    html+=`
    </div>
    <br>`
    document.getElementById('virtualSelect').innerHTML=html
    //form1EnvioDatos()
}

function imprimirInputs(){
    let html=`<div id='groupInputs'>`      
    html+=`
        <div class="containerVirtualForm">
            <label>Email:</label>
            <input type="text" name="Email" value='${valorSelectEmail(usuarioElegidoID)}'>
        </div>
        <br>
        
        <div class="containerVirtualForm">
            <label>Mensaje:</label>
            <input type="text" name="cuerpoMensaje" id="cuerpoMensaje">
        </div>
        <div class="containerBotones">
        <div id="BotonEnvio">
        </div>
        <div>
        <br>
        <button class="btnLimpiarBD" onclick=eliminarContenidoBD() type="submit">LimpiarBD</button>
        </div>
        </div>
        <br><br>  `
    html+=`</div>`
    document.getElementById('virtualForm').innerHTML=html
    //form1EnvioDatos()
}

function imprimirBotonEnvio(){
    let html=`<br>`
    html+=`<button class="btnEnviar" type="button" onclick="groupInputsEnviarDatos('${valorSelectTipo(usuarioElegidoID)}','${valorSelectEmail(usuarioElegidoID)}','${valorCuerpoMensaje()}')">Enviar`
    html+="</button>"  
    document.getElementById('BotonEnvio').innerHTML=html
    console.log("boton impreso")
}

function valorSelectTipo(usuarioElegidoID){
    let tipoSeleccionado=usuariosGenericos.find(function(x) { return x.id == usuarioElegidoID })["tipo"]
    console.log("valorSelect.tipoSeleccionado",tipoSeleccionado)
    return (tipoSeleccionado)
}

function valorSelectThumbnail(){
    let thumbailSeleccionado=usuariosGenericos.find(function(x) { return x.id == usuarioElegidoID })["thumbnail"]
    console.log("valorSelect.thumbnailSeleccionado",thumbailSeleccionado)
    return (thumbailSeleccionado)
}

function valorSelectEmail(usuarioElegidoID){
    let emailSeleccionado=usuariosGenericos.find(function(x) { return x.id == usuarioElegidoID })["email"]
    console.log("valorSelect.emailSeleccionado",emailSeleccionado)
    return emailSeleccionado
}

function valorCuerpoMensaje(){
    textoIn=document.getElementById("cuerpoMensaje").value;
    console.log("textoIn.emailSeleccionado",textoIn)
    return textoIn
}

inputTextListener()
function inputTextListener(){
    const input = document.getElementById('cuerpoMensaje');
    input.addEventListener('input', function updateValue(e) {
        imprimirBotonEnvio()
        console.log("fin.InputaddEventListener")
      })
}

function loadTipoSelect(){
    usuarioElegidoID=document.getElementById("userSelect").value;
    let tipoSeleccionado=usuariosGenericos.find(function(x) { return x.id == usuarioElegidoID })["Tipo"]
    console.log("loadMensajeSelect.tipoSeleccionado",tipoSeleccionado)
    imprimirInputs()
    valorSelectThumbnail()
    imprimirBotonEnvio()
    inputTextListener()
    console.log("fin.loadTipoSelect")
    return tipoSeleccionado
}

function loadCuerpoMensaje(){
    textoIn=document.getElementById("cuerpoMensaje").value;
    console.log("loadTextoSelect.textoIn",textoIn)
    imprimirBotonEnvio()
    console.log("fin.loadTextoSelect")
}
/* #endregion */ 

/* #region. 4.Envío y eliminación a backend desde formularios y botones*/
 
/*Virtual form 1ro*/
function groupInputsEnviarDatos(dato1,dato2,dato3){
    
    
    let usuarioSend={}
    usuarioSend.tipo=dato1
    usuarioSend.email=dato2
    let dateString=new Date().toLocaleString()
    usuarioSend.fechaHora=dateString
    usuarioSend.thumbnail=valorSelectThumbnail()
    usuarioSend.cuerpoMensaje=dato3
    usuarioSendParsed=JSON.stringify(usuarioSend)
    
    fetch('/apiClientes/comentarios', 
        {method: 'POST',
        headers:{'content-type':'application/json'},
        body: usuarioSendParsed
        }).then(res => {
            console.log("resPostFetch")
            res}).then(data => {
            console.log("dataPostFetch")
        //console.log("dataPost",data)
        //console.log("usuarioSendParsed.fetch.apiComentariosFile",usuarioSendParsed)
    });
        
    console.log("usuarioSendParsed.groupInputsEnviarDatos-final",usuarioSendParsed)
    //socket.emit('new-message',usuarioSendParsed);
    socket.emit('new-message',usuarioSendParsed);
}


function eliminarContenidoBD(){
    fetch(`/apiClientes/comentarios`,{method: 'DELETE',headers:{'content-type':'application/json'}})
    .then(response=>response)
    .then(productDatos=>{
        console.log("productosDatos.fetch.apiComentariosFile: ",productDatos)
        console.log("productosDatosLength.fetch.apiComentariosFile: ",productDatos.length)
        socket.emit('new-message-delete',{});
    })
    .catch(error=>{
        console.log(error)
    });
}

/* #endregion */