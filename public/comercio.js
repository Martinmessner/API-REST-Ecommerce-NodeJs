import {busquedaFiltrada, menuHamburguesa,mostrarCategorias} from "./funciones.js"
const lista = document.getElementById("xd")
let carrito = [];
const carritoIcono = document.querySelector(".carrito")
const modalContenedor = document.querySelector(".modal__contenedor")
const cerrarCarrito = document.getElementById("carritoCerrar")
const actualizarCarritooModal = document.getElementById("carrito-contenedor")
const vaciarCarrito = document.getElementById("vaciar-carrito")
const contadorCarrito = document.getElementById("contadorCarrito")
const precioTotal = document.getElementById("precioTotal")


document.addEventListener("DOMContentLoaded", () =>{
    fetchData();
    modalContenedorr();
    vaciarCarritoCompleto();
    menuHamburguesa();
    mostrarCategorias();
    busquedaFiltrada(".buscar",".contenedor__fotoo");
   
    
    })

const fetchData = async () => {
    try {
        const res = await fetch ('api.json')
        const data = await res.json()
       pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}

const pintarCards = data => {
    data.forEach(producto => {
       const div = document.createElement("div")
       div.classList.add("contenedor__fotoo")
       div.innerHTML = `
       <img class="foto" src="${producto.img}" alt=""  >
       <h3 class="contenedor__titulo">${producto.title}</h3>
       <p class="contenedor__precio">$${producto.precio}</p>
       <button id="${producto.id}" class="btn btn-dark">Añadir al Carrito</button>
       `
       lista.appendChild(div)

       const boton = document.getElementById(`${producto.id}`)
       boton.addEventListener("click", () => {
        let existe = false
        carrito.forEach(product => {
            if (producto.id == product.id){
                existe = true
                
            }
        })
            if (existe) {
                producto.cantidad++
            } else {
                carrito.push(producto)
            }
         actualizarCarrito();
         
        })
       
       })
      
 }


 
    function actualizarCarrito() {
        actualizarCarritooModal.innerHTML = ""

        carrito.forEach(prod => {
            const divCarrito = document.createElement("div")
            divCarrito.classList.add("productoEnCarrito")
            divCarrito.innerHTML = `
            <p>${prod.title}</p>
            <p>Precio: $${prod.precio}</p>
            <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
            <button id="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
            `
            actualizarCarritooModal.appendChild(divCarrito)
            
            

            function eliminarDelCarrito() {
            let eliminarObjeto = document.getElementById(`eliminarDelCarrito(${prod.id})`)
            eliminarObjeto.addEventListener("click", () => {
                 const xd = `${prod.id}` 
                 const xdd = carrito.find(producto => producto.id == xd)
                const indice = carrito.indexOf(xdd)
               
                    if (prod.cantidad >= 2 ) {
                        prod.cantidad--
                     }  else {
                        carrito.splice(indice, 1)
                     }
                     
                    
        actualizarCarrito() 
             
        })
        
    }
                eliminarDelCarrito() 
           
           })
    
function sumarPrecioTotal() {
    let sumTotal
    
  precioTotal.innerText = carrito.reduce((acc,prod) => sumTotal = acc + prod.cantidad*prod.precio, 0)

 }

sumarPrecioTotal()
contadorCarritoActualizado()
               
 }

                 function modalContenedorr() {
                carritoIcono.addEventListener("click", () =>{
                modalContenedor.classList.toggle("modal-active")

                cerrarCarrito.addEventListener("click", () =>{
                modalContenedor.classList.remove("modal-active")
                  })
                    })
}

function contadorCarritoActualizado() {
    contadorCarrito.innerText = carrito.length
}
                                                
function vaciarCarritoCompleto() {
    vaciarCarrito.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
   
})
}

