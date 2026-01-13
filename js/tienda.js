//Declaraciones

const fondos = ["comida.jpg", "comida2.jpg", "comida3.jpg", "comida4.jpg", "comida5.jpg", "comida6.jpg", "comida7.jpg", "comida8.jpg"]
const userLogin = JSON.parse(localStorage.getItem("userLogueado")) || []
const cards = JSON.parse(localStorage.getItem("cards")) || []
const cart = JSON.parse(localStorage.getItem("cart")) || []
let i = 0
let frase = "Bienvenidos"

if (cards.length === 0) {
    cards.push({id: 1, nombre: "Casco", precio: "100", img:"https://http2.mlstatic.com/D_NQ_NP_2X_886323-MLA102879533063_122025-F.webp", cantidad: 1}, {id: 2, nombre: "Gabinete", precio: "300", img:"https://http2.mlstatic.com/D_NQ_NP_2X_975193-MLA99453290248_112025-F.webp", cantidad: 1}, {id: 3, nombre: "Masajeador", precio: "500", img:"https://http2.mlstatic.com/D_NQ_NP_2X_868139-MLU78163223341_082024-F.webp", cantidad: 1})
    localStorage.setItem("cards", JSON.stringify(cards))
}


//Obtener elementos del dom
const saludo = document.getElementById("saludo")
const boxFondos = document.getElementById("boxFondos")
const titulo = document.getElementById("titulo")
const contenedor = document.getElementById("contenedor")
const inputNombre = document.getElementById("campoNombre")
const inputImagen = document.getElementById("campoImagen")
const inputPrecio = document.getElementById("campoPrecio")
const inputBuscar = document.getElementById("campoBuscar")
const boton = document.getElementById("boton")
const botonBuscar = document.getElementById("botonBuscar")
const contador = document.getElementById("contador")
const botonOff = document.getElementById("botonOff")

setInterval(()=>{
    if (i < frase.length) {
        titulo.textContent += frase[i]
        i++
    } else {
        titulo.textContent = ""
        i = 0
    }
}, 200)


//Funciones

function cambiarFondo(arr) {
    let random = Math.floor(Math.random() * arr.length)
    boxFondos.style.backgroundImage = `url(../img/${arr[random]})`
}

function renderCards(arr = cards) {
    contenedor.innerHTML = ""
    arr.map((el, index) =>{
        const {id, nombre, precio, img} = el
        contenedor.innerHTML += `<div>
        <img src="${img}" alt="foto-producto">
        <h3>${nombre} id:${id}</h3>
        <p>${precio}</p>
        <button onclick="agregarCart(${index})" class="botonAgregar">Agregar al carrito</button>
        <button onclick="eliminarCard(${index})" class="botonEliminar">Eliminar</button>
    </div>
`
})
}


function eliminarCard(index) {
    cards.splice(index, 1)
    localStorage.setItem("cards", JSON.stringify(cards))
    renderCards()
}

function agregarCard() {
    cards.push({id: cards.length + 1, nombre: inputNombre.value, precio: inputPrecio.value, img: inputImagen.value, cantidad: 1})
    localStorage.setItem("cards", JSON.stringify(cards))
    renderCards()
}

function agregarCart(index) {
    const producto = cards[index]
    const existe = cart.find(el => el.id === producto.id)
    if (existe) {
        existe.cantidad++
    } else {
        cart.push({
            ...producto,
            cantidad: 1
        })
    }
    alert(`${cards[index].nombre} fue agregado al carrito`)
    localStorage.setItem("cart", JSON.stringify(cart))
    renderContador()
}

function buscarCard() {
    let existe = cards.find(el => el.nombre.toLowerCase().includes(inputBuscar.value.toLowerCase()))
    let objeto = JSON.stringify(existe)
    alert(objeto)
}

function renderContador() {
    let resultado = cart.reduce((acc, el) => acc + el.cantidad, 0)
    contador.textContent = `(${resultado})`
}

function loginOff() {
    cart.length = 0
    localStorage.setItem("cart", JSON.stringify(cart))
    renderContador()
    saludo.textContent = ""
    setTimeout(()=>{
        window.location.href = "../index.html"
    }, 500)
}


//Eventos

if (!userLogin) {
    window.location.href = "../index.html"
}else{
    saludo.textContent = `Hola ${userLogin.name}`

}


window.addEventListener("DOMContentLoaded", (e) =>{
    e.preventDefault()
    cambiarFondo(fondos)
})

boton.addEventListener("click", (e) =>{
    e.preventDefault()
    agregarCard()
    inputImagen.value = ""
    inputNombre.value = ""
    inputPrecio.value = ""
})

botonBuscar.addEventListener("click", (e) =>{
    e.preventDefault()
    buscarCard()
    inputBuscar.value = ""
})

botonOff.addEventListener("click", (e) =>{
    e.preventDefault()
    loginOff()
})

inputBuscar.addEventListener("input", ()=>{
    let existe = cards.filter(el => el.nombre.toLowerCase().includes(inputBuscar.value.toLowerCase()))
    renderCards(existe)
})


renderCards()
renderContador()

const botonAgregar = document.querySelectorAll(".botonAgregar")

botonAgregar.forEach(el => {
    el.addEventListener("mouseenter", (e)=>{
        e.preventDefault()
        el.classList.add("botonVerde")
    })

    el.addEventListener("mouseleave", (e) =>{
        el.classList.remove("botonVerde")
    })

    }
)

const botonEliminar = document.querySelectorAll(".botonEliminar")

botonEliminar.forEach(el => {
    el.addEventListener("mouseenter", (e)=>{
        e.preventDefault()
        el.classList.add("botonRojo")
    })

    el.addEventListener("mouseleave", (e) =>{
        el.classList.remove("botonRojo")
    })

    }
)