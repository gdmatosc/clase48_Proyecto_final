const {faker} = require('@faker-js/faker')

faker.commerce.productDescription() 
faker.commerce.price(70, 100, 0)


const getPersona=()=>({
    nombre:faker.name.firstName(),
    email:faker.internet.email()
})

const getPrecio=()=>{

    return faker.commerce.price(70, 100, 0)
}

const getDescripcion=()=>{
    return faker.commerce.productDescription() 
}
module.exports={
    getPersona,
    getPrecio,
    getDescripcion
}