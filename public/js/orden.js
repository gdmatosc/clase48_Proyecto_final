
fetch(`/apiClientes/objetosOrden`,{headers:{admin:'true'}})
.then(response=>response.json())
.then(ordenDatos=>{
    console.log("[orden.js][fetch-objetosCarrito] (msg) ordenDatos: ",ordenDatos)
    cantidadOrden=ordenDatos.length
    console.log("[orden.js][fetch-objetosCarrito] (msg) cantidadOrden: ",cantidadOrden)
    console.log("[orden.js][fetch-objetosCarrito] (msg) ordenDatos.products: ",ordenDatos[cantidadOrden-1].products)
    
    let html=`</div>`
    for (let i=0, j=ordenDatos.length-1; i < ordenDatos.length; i++, j--){
        html+=`</div>`
        html+=`<h2 class="d-flex justify-content-center mb-3">Compra #${j+1}</h2>`
        html+=`<h4 class="d-flex justify-content-center">
        <span class="detalleTitulo">Correo: </span><span class="detalleTexto">${ordenDatos[j].email} </span>
        &nbsp;&nbsp;&nbsp;&nbsp;<span class="detalleTitulo">Fecha-Hora: </span><span class="detalleTexto">${ordenDatos[j].fechaHora} </span>
        </h4>`
        html+=`<table class='table' id='lista-compra'>
        <thead>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
                <th scope="col">imagen</th>
            </tr>
            
        </thead>
        <tbody >`
        for (const product of ordenDatos[j].products){
            
            if (product["_id"]){
                let product_id=product["_id"]
                html+=`
                <tr id='itemFila${product_id}'>
                    <td>${product.nombre}</td>
                    <td>${product.precio}</td>
                    <td>${product.cantidad}</td>
                    <td><img src=${product.img} style='width:40px; height:30px;'></td>
                   
                </tr>      
                `
            }
            else{
                html+=`
                <tr id='itemFila${product.id}'>
                    <td>${product.nombre}</td>
                    <td>${product.precio}</td>
                    <td>${product.cantidad}</td>
                    <td><img src=${product.img} style='width:40px; height:30px;'></td>
                   
                </tr>      
                `
    
               
            }
        }
        html+=`
        </tbody>
        </table>
        `
        html+=`</div>`
    }
    
    document.getElementById('carrito1').innerHTML=html

    
})
.catch(error=>{
    console.log(error)
});




