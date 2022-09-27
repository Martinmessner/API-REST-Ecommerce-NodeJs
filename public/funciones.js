function menuHamburguesa() {
    const acordeon = document.querySelector(".panel-btn")
    const navegacion = document.querySelector(".contenedor__ul")
     const xd = document.querySelector(".hamburger--vortex")
    acordeon.addEventListener("click", () => {
        navegacion.classList.toggle("activo")  
        xd.classList.toggle("is-active")
    })
   
}
function mostrarCategorias() {
    const mostrarCategorias = document.getElementById("categorias")
    const contenedorArrow = document.querySelector(".contenedor__arrow")
    mostrarCategorias.addEventListener("click", ()=> {
        contenedorArrow.classList.toggle("activo")
    })
}

function busquedaFiltrada(input,selector) {
    document.addEventListener("keyup", e => {
        if (e.target.matches(input)) {
           
            const xd = document.querySelectorAll(selector)
            xd.forEach(el => el.textContent.toLowerCase().includes(e.target.value)
            ? el.classList.remove("filtrar") 
            : el.classList.add("filtrar")
            
            )
        }        
    })  
} 

export {busquedaFiltrada, menuHamburguesa, mostrarCategorias}