const Joi = require('joi')
const logd = require('../../logging.js')
const modname='[productos.model.validar.js]'
const logr=logd.child({modulo:`${modname}`})

class Productos{
    constructor(nombre,img,precio,descripcion,categoria){
        this.nombre=nombre
        this.img=img
        this.precio=precio
        this.descripcion=descripcion
        this.categoria=categoria
    }

    equals(otroProductos){
        if(!(otroProductos instanceof Productos)){
            return false
        }
        if(this.nombre!=otroProductos.nombre){
            return false
        }
        if(this.img!=otroProductos.img){
            return false
        }
        if(this.precio!=otroProductos.precio){
            return false
        }
        if(this.descripcion!=otroProductos.descripcion){
            return false
        }
        if(this.categoria!=otroProductos.categoria){
            return false
        }
        return true
    }

    static validar(producto,requerido){
        logr.debug('(inicio)',{recurso:'[static validar()][na'})
        const ProductoSchema=Joi.object({
            nombre: requerido? Joi.string().required(): Joi.string(),
            img: requerido? Joi.string().required(): Joi.string(),
            precio: requerido? Joi.number().required(): Joi.number(),
            descripcion: requerido? Joi.string().required(): Joi.string(),
            categoria: requerido? Joi.string().required(): Joi.string(),
        })
        const {error}=ProductoSchema.validate(producto)
        logr.warn(error,{recurso:'[error]'})
        if(error){
            throw error
        }
    }
}

module.exports=Productos
