/* #region. 1.Parámetros y recursos generales*/

/* #region. Plantilla*/

/* #endregion */ 


loadCantidadItemsxCarrito()
/* #endregion */ 

/* #region. 2.Llenar ícono de carrito con su cantidad de productos*/

function loadCantidadItemsxCarrito(){
    fetch(`/apiClientes/objetosCarrito`,{headers:{admin:'true'}})
        .then(response=>response.json())
        .then(productDatos=>{            
            console.log("productosDatos.Fetch.productosClientes",productDatos)
            if (!productDatos || !productDatos.products){
                console.log("productosGetSizeCart.fetch.loadCantidadItemsxCarrito: ",0)
                let html1=`<span>0</span>`
                console.log("html1.noDatos.fetch",html1)
                document.getElementById('Resumen1').innerHTML=html1  
            }
            else{

                console.log("productosGetCart.fetch.loadCantidadItemsxCarrito: ",productDatos.products)
                console.log("productosGetSizeCart.fetch.loadCantidadItemsxCarrito: ",productDatos.products.length)
                let html1=`<span>${productDatos.products.length}</span>`
                console.log("html1.siDatos.fetch",html1)
                document.getElementById('Resumen1').innerHTML=html1 
            }
            
        })
        .catch(error=>{
            console.log(error)
        });
}


/* #endregion */ 

/* #region. 3.Llenar la lista de productos disponibles para comprar*/
fetch('/apiClientes/objetos',{headers:{admin:'true'}})
.then(response=>response.json())
.then(productDatos=>{
    
    console.log("[productosClientes.js][fetch] productosDatos: ",productDatos)
    console.log("[productosClientes.js][fetch] productosDatos.length: ",productDatos.length)
    let productsG1=[]
    let productsG2=[]
    let productsG3=[]
    for (let i=0;i<3;i++){
        console.log(`[productosClientes.js][fetch][for] productDatos[${i}]: `,productDatos[i])
        productsG1[i]=productDatos[i]
        if (i<2){
            productsG2[i]=productDatos[i+3]
            productsG3[i]=productDatos[i+5]
        }
    }
    console.log("[productosClientes.js][fetch] productsG1: ",productsG1)
    console.log("[productosClientes.js][fetch] productsG2: ",productsG2)
    console.log("[productosClientes.js][fetch] productsG3: ",productsG3)
    let groups=[productsG1,productsG2,productsG3]
    let html="<div class='card-deck mb-3 row text-center'>"
    for (const item of groups){
        html+="<div class='card-deck mb-3 row text-center'>"
        for (const product of item){
            html+=`
                    <div class="card card mb-4 shadow-sm">
                        <div class="card-header">
                            <h4 class="my-0 font-weight-bold">${product.nombre}</h4>
                        </div>
                        <div class="card-body">
                            <img src=${product.img} class="card-img-top_3img">
                            <h1 class="card-title pricing-card-title precio">$ <span class="">${product.precio}</span></h1>
    
                            <ul class="list-unstyled mt-3 mb-4">
                                <li></li>
        
                                <li><b>Descripción:</b> ${product.descripcion}</li>
                                <li><b>Categoría:</b> ${product.categoria}</li>
                                <li><b>Cantidad:</b> 1 </li>
                            </ul>
                            <button type="button" onclick="agregarCarritoNew('${product.nombre}','${product.img}',${product.precio},'${product.descripcion}','${product.categoria}')" href="" class="btn btn-block btn-primary" data-id="1">Comprar</button>
                        </div>
                    </div>
            `
        }
        html+="</div>"
        
    }
    
    document.getElementById('lista-productos').innerHTML=html

    
})
.catch(error=>{
    console.log(error)
});
/* #endregion */ 

/* #region. 4.Actualizar los productos comprados en carrito*/


let agregarCarritoNew=(dato1,dato2,dato3,dato4,dato5)=>{
    let nuevoProducto={}
    nuevoProducto.nombre=dato1
    nuevoProducto.img=dato2
    nuevoProducto.precio=dato3
    nuevoProducto.descripcion=dato4
    nuevoProducto.categoria=dato5
    nuevoProducto.cantidad=1
    console.log("nuevoProducto: ",nuevoProducto)
    fetch(`/apiClientes/objetosCarrito`,{method:'POST',headers:{'content-type':'application/json',admin:'true'},body:JSON.stringify(nuevoProducto)})
    .then(response=>response.json())
    .then(datosFetch=>{

            console.log("productosPost: ",datosFetch)
            console.log("datosFetch.products.length)",datosFetch.products.length)
        })
        .catch(error=>{
            console.log(error)
        });
    
    location.reload()
    console.log("[productosClientes.js](fin)Click en Botón",dato1,dato2)
}


/* #endregion */ 



