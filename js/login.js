//Declaraciones
const users = JSON.parse(localStorage.getItem("users")) || []
const userLogueado = JSON.parse(localStorage.getItem("userLogueado"))

if (users.length === 0) {
    users.push({name: "pepito", clave: "pepito1234"})
    localStorage.setItem("users", JSON.stringify(users))
}



//Obteniendo elementos html del DOM
const inputUser = document.getElementById("campoUser")
const inputClave = document.getElementById("campoClave")
const botonIngresar = document.getElementById("botonIngresar")
const box = document.getElementById("boxCargando")

//Funciones


function access() {
    const nombre = inputUser.value.trim()
    const pass = inputClave.value.trim()
    let condicion = users.find(el => el.name === nombre && el.clave === pass)
    if (condicion) {
        localStorage.setItem("userLogueado", JSON.stringify(condicion))
        renderCargando()
        setTimeout(()=> {
            window.location.href = "./pages/tienda.html"
        }, 500)
        
    } else {
        alert("Credenciales incorrectas")
    }

}

function renderCargando() {
    box.innerHTML = ""
    box.innerHTML = `<h1>Cargando...</h1>`
}

//Eventos

botonIngresar.addEventListener("click", (e) =>{
    e.preventDefault()
    access()
})