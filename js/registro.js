//Declaraciones
const users = JSON.parse(localStorage.getItem("users")) || []
const userLogueado = JSON.parse(localStorage.getItem("userLogueado"))



//Obteniendo elementos html del DOM

const inputUser = document.getElementById("campoUserRegistro")
const inputClave = document.getElementById("campoClaveRegistro")
const boton = document.getElementById("botonRegistro")
const box = document.getElementById("boxCargandoRegistro")


//Funciones

function registro() {
    const nombre = inputUser.value.trim()
    const pass = inputClave.value.trim()
    const nuevoUsuario = ({name: nombre, clave: pass})
    users.push(nuevoUsuario)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("userLogueado", JSON.stringify(nuevoUsuario))
    renderCargando()
    setTimeout(()=>{
        window.location.href = "../pages/tienda.html"
    }, 500)
    
}

function renderCargando() {
    box.innerHTML = ""
    box.innerHTML = `<h1>Cargando...</h1>`
}

//Eventos

boton.addEventListener("click", (e) =>{
    e.preventDefault()
    registro()
})