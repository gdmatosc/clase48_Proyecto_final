/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */ 


//loadCantidadItemsxCarrito()
/* #endregion */ 

/* #region. 2.Llenar ícono de carrito con su cantidad de productos*/


// function loadCantidadItemsxCarrito(){
//     fetch(`/apiClientes/objetosCarrito`,{headers:{admin:'true'}})
//         .then(response=>response.json())
//         .then(productDatos=>{            
//             //console.log("carritoTest1",carritoTest1)
//             console.log("productosDatos.Fetch.productosClientes",productDatos)
//             if (!productDatos || !productDatos.products){
//                 console.log("productosGetSizeCart.fetch.loadCantidadItemsxCarrito: ",0)
//                 let html1=`<span>0</span>`
//                 console.log("html1.noDatos.fetch",html1)
//                 document.getElementById('Resumen1').innerHTML=html1  
//             }
//             else{

//                 console.log("productosGetCart.fetch.loadCantidadItemsxCarrito: ",productDatos.products)
//                 console.log("productosGetSizeCart.fetch.loadCantidadItemsxCarrito: ",productDatos.products.length)
//                 let html1=`<span>${productDatos.products.length}</span>`
//                 console.log("html1.siDatos.fetch",html1)
//                 document.getElementById('Resumen1').innerHTML=html1 
//             }
            
//         })
//         .catch(error=>{
//             console.log(error)
//         });
// }




/* #endregion */ 

/* #region. 3.Llenar la lista de productos disponibles para comprar*/

// fetch(`/apiClientes/objetos/`,{headers:{admin:'true'}})
// .then(response=>response.json())
// .then(productDatos=>{
    
//     console.log("productosGet: ",productDatos)
//     console.log("productosGetSize: ",productDatos.length)
    
//     //let html1=`<span>${productDatos.length}</span>`
//     let html="<div class='card-deck mb-3 row text-center'>"
//     for (const product of productDatos){
//         html+=`
//                 <div class="card card mb-4 shadow-sm">
//                     <div class="card-header">
//                         <h4 class="my-0 font-weight-bold">${product.nombre}</h4>
//                     </div>
//                     <div class="card-body">
//                         <img src=${product.img} class="card-img-top_3img">
//                         <h1 class="card-title pricing-card-title precio">$ <span class="">${product.precio}</span></h1>

//                         <ul class="list-unstyled mt-3 mb-4">
//                             <li></li>
    
//                             <li>${product.descripcion}</li>
//                             <li>${product.promocion}</li>
//                         </ul>
//                         <button type="button" onclick="agregarCarritoNew('${product.nombre}','${product.img}',${product.precio},'${product.descripcion}','${product.promocion}')" href="" class="btn btn-block btn-primary" data-id="1">Comprar</button>
//                     </div>
//                 </div>
//         `
//     }
//     html+="</div>"
//     document.getElementById('lista-productos').innerHTML=html
//     //document.getElementById('Resumen1').innerHTML=html1
    
// })
// .catch(error=>{
//     console.log(error)
// });


/* #endregion */ 

/* #region. 4.Actualizar los productos comprados en carrito*/


// let agregarCarritoNew=(dato1,dato2,dato3,dato4,dato5)=>{
//     let nuevoProducto={}
//     nuevoProducto.nombre=dato1
//     nuevoProducto.img=dato2
//     nuevoProducto.precio=dato3
//     nuevoProducto.descripcion=dato4
//     nuevoProducto.promocion=dato5
//     nuevoProducto.cantidad=2
//     console.log("nuevoProducto: ",nuevoProducto)
//     fetch(`/apiClientes/objetosCarrito`,{method:'POST',headers:{'content-type':'application/json',admin:'true'},body:JSON.stringify(nuevoProducto)})
//     .then(response=>response.json())
//     .then(datosFetch=>{

//             console.log("productosPost: ",datosFetch)
//             console.log("datosFetch.products.length)",datosFetch.products.length)
//         })
//         .catch(error=>{
//             console.log(error)
//         });
    
//     location.reload()
//     console.log("[productosClientes.js](fin)Click en Botón",dato1,dato2)
// }


/* #endregion */ 


/* #region. Bloc*/


/* #endregion */ 


