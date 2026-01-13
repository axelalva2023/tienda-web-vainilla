//Declaraciones
const cart = JSON.parse(localStorage.getItem("cart")) || []
const userLogin = JSON.parse(localStorage.getItem("userLogueado")) || []


//Obtener elementos html del DOM
const contenedor = document.getElementById("boxCarrito")
const botonComprar = document.getElementById("botonComprar")
const total = document.getElementById("total")
const contador = document.getElementById("contador")
const botonClear = document.getElementById("botonClear")
const saludo = document.getElementById("saludo")
const botonOff = document.getElementById("botonOff")

//Funciones

function renderCart() {
    contenedor.innerHTML = ""
    cart.map((el, index) =>{
        const {nombre, precio, img, cantidad} = el
        contenedor.innerHTML += `<div>
        <img src="${img}" alt="foto-producto">
        <h3>${nombre}</h3>
        <p>${precio} X (${cantidad})</p>
        <button onclick="sumarCantidad(${index})">+</button>
        <button onclick="restarCantidad(${index})">-</button>
        <button onclick="eliminarItem(${index})">Eliminar</button>
    </div>
`
})
}

function eliminarItem(index) {
    cart.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(cart))
    renderCart()
    renderTotal()
    renderContador()
}

function sumarCantidad(index) {
    cart[index].cantidad++
    localStorage.setItem("cart", JSON.stringify(cart))
    renderCart()
    renderTotal()
    renderContador()
}

function restarCantidad(index) {
    cart[index].cantidad--
    localStorage.setItem("cart", JSON.stringify(cart))
    renderCart()
    renderTotal()
    renderContador()
}

function vaciarCarrito() {
    cart.splice(0, cart.length)
    localStorage.setItem("cart", JSON.stringify(cart))
    renderCart()
    renderTotal()
    renderContador()
}

function renderTotal() {
    let resultado = cart.reduce((acc, el) => acc + parseInt(el.precio) * parseInt(el.cantidad), 0)
    total.textContent = `Total: ${resultado}`
}

function renderContador() {
    let resultado = cart.reduce((acc, el) => acc + el.cantidad, 0)
    contador.textContent = `(${resultado})`
}

function comprar() {
    vaciarCarrito()
    setTimeout(()=>{
        window.location.href = "../pages/tienda.html"
    }, 500)
}

function loginOff() {
    vaciarCarrito()
    saludo.textContent = ""
    setTimeout(()=>{
        window.location.href = "../index.html"
    }, 500)
}

//Eventos

saludo.textContent = `Hola ${userLogin.name}`

botonClear.addEventListener("click", (e) =>{
    e.preventDefault()
    vaciarCarrito()
})

botonComprar.addEventListener("click", (e) =>{
    e.preventDefault()
    comprar()
})

botonOff.addEventListener("click", (e) =>{
    e.preventDefault()
    loginOff()
})

renderCart()
renderTotal()
renderContador()