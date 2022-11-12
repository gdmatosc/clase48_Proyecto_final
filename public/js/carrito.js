
fetch(`/apiClientes/objetosCarrito`,{headers:{admin:'true'}})
.then(response=>response.json())
.then(productDatos=>{
    console.log("[carrito.js][fetch-objetosCarrito] (msg) productDatos: ",productDatos)
    console.log("[carrito.js][fetch-objetosCarrito] (msg) productDatos.products: ",productDatos.products)
    //let direccionEntrega=''
    let textProductDatos=JSON.stringify(productDatos.products)
    //console.log("productosGetCart: ",textProductDatos)
    console.log("[carrito.js][fetch-objetosCarrito] (msg) productDatos.products.length: ",productDatos.products.length)
    let html =`
    <div class="form-group row">
                                <label for="email" class="col-12 col-md-2 col-form-label h2">Dirección de entrega :</label>
                                <div class="col-12 col-md-10">
                                    <input type="text" class="form-control" id="idDireccionEntrega" placeholder="Ingresa tu direccion de entrega" name="direccionEntrega">
                                </div>
                            </div>

    `
    html+=`<table class='table' id='lista-compra'>
    <thead>
        <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Categoria</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">imagen</th>
            <th scope="col">Eliminar</th>
        </tr>
        
    </thead>
    <tbody >`
    for (const product of productDatos.products){
        
        if (product["_id"]){
            let product_id=product["_id"]
            html+=`
            <tr id='itemFila${product_id}'>
                <td>${product.nombre}</td>
                <td>${product.categoria}</td>
                <td>${product.precio}</td>
                <td>${product.cantidad}</td>
                <td><img src=${product.img} style='width:40px; height:30px;'></td>
                <td>
                    <a href="#" id='itemRegistro' ><i class='fa fa-times-circle' style='color: rgb(221, 215, 215)' onclick='eliminarPorID("${product_id}")'></i></a>
                </td>
            </tr>      
            `
        }
        else{
            html+=`
            <tr id='itemFila${product.id}'>
                <td>${product.nombre}</td>
                <td>${product.categoria}</td>
                <td>${product.precio}</td>
                <td>${product.cantidad}</td>
                <td><img src=${product.img} style='width:40px; height:30px;'></td>
                <td>
                    <a href="#" id='itemRegistro' ><i class='fa fa-times-circle' style='color: rgb(221, 215, 215)' onclick='eliminarPorID("${product.id}")'></i></a>
                </td>
            </tr>      
            `

           
        }
    }
    html+=`
    </tbody>
    </table>
    `
    html+=`<div class="row justify-content-between">
             <div class="col-md-4 mb-2">
                 <a href="/productos" class="btn btn-info btn-block">Seguir comprando</a>
             </div>
             <div class="col-xs-12 col-md-4">
                 <a id="procesar-compra" class="btn btn-success btn-block" onclick='crearOrden(${textProductDatos})'>Procesar Compra</a>
             </div>
           </div>`
    document.getElementById('carrito1').innerHTML=html
    
    
})
.catch(error=>{
    console.log(error)
});

function fnDireccionEntrega(){
    textoIn=document.getElementById("idDireccionEntrega").value;
    console.log("[fnDireccionEntrega()] textoIn: ",textoIn)
    return textoIn
}

function eliminarPorID(idProducto){
    //console.log("círculo de delete 0.idProducto",idProducto)
    //${idProducto}
    let productoxEliminar={}
    productoxEliminar.id=idProducto
    console.log("[carritoClientes.js][eliminarPorId] (msg) productoxEliminar: ",productoxEliminar)
    fetch(`/apiClientes/objetosCarrito`,{method: 'DELETE',headers:{'content-type':'application/json'},body:JSON.stringify(productoxEliminar)})
    .then(response=>response)
    .then(productDatos=>{
        //console.log("productosDBGetElimando: ",productDatos)
        console.log("[carritoClientes.js][eliminarPorID](msg) productosDBGetSizeEliminado: ",productDatos.length)
        console.log("[carritoClientes.js][eliminarPorID](msg) idProducto: ",idProducto)
    })
    .catch(error=>{
        console.log(error)
    });
    document.getElementById(`itemFila${idProducto}`).remove();
    //console.log("círculo de delete 1.idProducto",idProducto)
}

async function crearOrden(productosComprados){
    console.log("[carrito.js][crearOrden()] (msg) (inicio)")
    let carritoDatos=await obtenerDatosCarrito()
    console.log("[carrito.js][crearOrden()] (msg) carritoDatos: ",carritoDatos)
    let cantidadOrden=0
    let datosOrden0=await fetch('/apiClientes/objetosOrden',{headers:{admin:'true'}})
    console.log("[carrito.js][crearOrden()] (msg) datosOrden0: ",datosOrden0)
    let datosOrden1=await datosOrden0.json()
    console.log("[carrito.js][crearOrden()] (msg) datosOrden1: ",datosOrden1)
    
    cantidadOrden=datosOrden1.length

    carritoDatos.numeroOrden=cantidadOrden+1
    await guardarDatosOrden(carritoDatos)
    eliminarCarrito()
    notificarAdmin(productosComprados)
    window.location.href = "/orden"

}

async function obtenerDatosCarrito (){

    let datosCarrito0=await fetch('/apiClientes/objetosCarrito',{headers:{admin:'true'}})
    let datosCarrito1=await datosCarrito0.json()
    let nuevoDatoCarrito={}
    nuevoDatoCarrito.direccionEntrega=fnDireccionEntrega()
    nuevoDatoCarrito.email=datosCarrito1.email
    nuevoDatoCarrito.estado='generada'
    nuevoDatoCarrito.products=datosCarrito1.products
    nuevoDatoCarrito.fechaHora=new Date().toLocaleString()
   
    console.log("[carrito.js][obtenerDatosCarrito()][after fetch] : datosCarrito0",datosCarrito0)
    console.log("[carrito.js][obtenerDatosCarrito()][after fetch] : datosCarrito1",datosCarrito1)
    console.log("[carrito.js][obtenerDatosCarrito()][after fetch] : nuevoDatoCarrito",nuevoDatoCarrito)
    return nuevoDatoCarrito
}

async function guardarDatosOrden(datosCarritoLast){
    newPayload=JSON.stringify(datosCarritoLast)
    console.log("[carrito.js][guardarDatosOrden()](inicio)[antes de fetch] newPayload: ",newPayload)
    let datosOrdenConfirmar0=await fetch('/apiClientes/objetosOrden', {method: 'POST',headers:{'content-type':'application/json'},body: newPayload})
    console.log("[carrito.js][guardarDatosOrden()][after fetch] : datosCarrito0",datosOrdenConfirmar0)
    

}

function eliminarCarrito(){
   
    console.log("[carrito.js][eliminarCarrito()](msg) (inicio)")
    fetch(`/apiClientes/carrito`,{method: 'DELETE',headers:{'content-type':'application/json'}})
    .then(response=>response)
    .then(productDatos=>{
        console.log("[carrito.js][eliminarCarrito()](msg) productosDatos: ",productDatos)
    })
    .catch(error=>{
        console.log(error)
    });
    //console.log("círculo de delete 1.idProducto",idProducto)
}

function notificarAdmin(productosComprados){
    console.log("[carritoClientes.js][notificarAdmin] (msg) productosComprados",productosComprados)
    

    newPayload=JSON.stringify(productosComprados)
    fetch('/apiOperaciones/notificacion', {method: 'POST',headers:{'content-type':'application/json'},body: newPayload})
     .then(res => {
        res
            
        })
        
     .then(data => {
        console.log("[carritoClientes.js][fecth-POST](dataPostEnviarDatos) data:",data)
        console.log("[carritoClientes.js][fecth-POST](newPayloadFetchEnviarDatos) newPayload: ",newPayload)
        
    })
    
     .catch(error=>{
        console.log(error)
     });
}



