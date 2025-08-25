
// Validación paso 1
function validarPaso1() {
    const nombre = document.getElementById("nombre").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const email = document.getElementById("email").value.trim();
    const celular = document.getElementById("celular").value.trim();

    if (!nombre) {
        mostrarError("Por favor, ingresa tu nombre completo.");
        return false;
    }
    if (!/^\d{8}$/.test(dni)) {
        mostrarError("Por favor, ingresa un DNI válido (8 dígitos).");
        return false;
    }
    if (!validarEmail(email)) {
        mostrarError("Por favor, ingresa un correo electrónico válido.");
        return false;
    }
    if (celular && !/^\d{9}$/.test(celular)) {
        mostrarError("Por favor, ingresa un celular válido (9 dígitos).");
        return false;
    }
    return true;
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Función para cambiar cantidad - DEFINIDA EN ÁMBITO GLOBAL
function cambiarCantidad(boton, delta) {
    const cantidadSpan = boton.parentElement.querySelector('.cantidad');
    let cantidad = parseInt(cantidadSpan.textContent);
    cantidad += delta;
    if (cantidad < 0) cantidad = 0;
    cantidadSpan.textContent = cantidad;

    actualizarTotal();
}

// Función para actualizar total/subtotal - DEFINIDA EN ÁMBITO GLOBAL
function actualizarTotal() {
    let total = 0;
    const productos = document.querySelectorAll('.producto');

    productos.forEach(producto => {
        const precio = parseFloat(producto.dataset.precio || 0);
        const cantidad = parseInt(producto.querySelector('.cantidad').textContent);
        total += precio * cantidad;
    });

    // Total (Paso 3)
    const totalElemento = document.getElementById('monto-total');
    if (totalElemento) {
        totalElemento.textContent = `Total: S/ ${total.toFixed(2)}`;
    }

    // Subtotal (Paso 2)
    const subtotalElemento = document.getElementById('subtotal-ventas');
    if (subtotalElemento) {
        subtotalElemento.textContent = `Subtotal: S/ ${total.toFixed(2)}`;
        subtotalElemento.classList.add('resaltar-subtotal');
        setTimeout(() => {
            subtotalElemento.classList.remove('resaltar-subtotal');
        }, 300);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const opciones = document.querySelectorAll(".tarjeta-pago input[type='radio']");

    opciones.forEach(input => {
        input.addEventListener("change", function () {
            document.querySelectorAll(".tarjeta-pago").forEach(label => {
                label.classList.remove("activa");
            });
            this.parentElement.classList.add("activa");
        });
    });

    const btn = document.getElementById("btnFinalizar");
    const mensaje = document.getElementById("mensajeExito");

    btn.addEventListener("click", function (e) {
        e.preventDefault();
        const metodoPago = document.querySelector("input[name='pago']:checked");
        if (!metodoPago) {
            mostrarError("Por favor, selecciona un método de pago.");
            mensaje.style.display = "none";
            return;
        }
        document.getElementById('modalError').style.display = 'none';
        mensaje.style.display = "block";
    });

    // Evento para cerrar modal
    document.getElementById('cerrarModalError').addEventListener('click', () => {
        document.getElementById('modalError').style.display = 'none';
    });

    // Paso 1: validar datos y pasar a paso 2
    document.getElementById("btnPaso1").addEventListener("click", () => {
        if (validarPaso1()) {
            document.getElementById("paso2").checked = true;
        }
    });

    // Paso 2: validar productos seleccionados y pasar a paso 3
    document.querySelector('label[for="paso3"]').addEventListener('click', (e) => {
        const cantidades = document.querySelectorAll('.producto .cantidad');
        let totalProductos = 0;
        cantidades.forEach(cantidadSpan => {
            totalProductos += parseInt(cantidadSpan.textContent);
        });
        if (totalProductos === 0) {
            e.preventDefault();  // evitar avanzar si no hay productos
            mostrarError("Por favor, selecciona al menos un producto antes de continuar.");
        }
    });

    // Añadir eventos a botones + y -
    const botones = document.querySelectorAll('.producto .contador button');
    botones.forEach(boton => {
        boton.addEventListener('click', function () {
            const delta = this.textContent === '+' ? 1 : -1;
            cambiarCantidad(this, delta);
        });
    });

    // Paso 3: validar método de pago y finalizar pedido
    document.getElementById("btnFinalizar").addEventListener("click", (e) => {
        const metodoPago = document.querySelector("input[name='pago']:checked");
        if (!metodoPago) {
            e.preventDefault();
            mostrarError("Por favor, selecciona un método de pago.");
            return;
        }
    });

    // Paginación de productos
    const productos = document.querySelectorAll('.contenedor-productos .producto');
    const paginacion = document.getElementById('paginacion');
    const productosPorPagina = 6;
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    let paginaActual = 1;

    function mostrarPagina(pagina) {
        paginaActual = pagina;
        productos.forEach(p => p.style.display = 'none');
        const inicio = (pagina - 1) * productosPorPagina;
        const fin = inicio + productosPorPagina;
        for (let i = inicio; i < fin && i < productos.length; i++) {
            productos[i].style.display = 'block';
        }
        actualizarPaginacion();
    }

    function actualizarPaginacion() {
        paginacion.innerHTML = '';

        const btnAnterior = document.createElement('button');
        btnAnterior.textContent = '◀';
        btnAnterior.disabled = paginaActual === 1;
        btnAnterior.onclick = () => mostrarPagina(paginaActual - 1);
        paginacion.appendChild(btnAnterior);

        for (let i = 1; i <= totalPaginas; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            if (i === paginaActual) btn.classList.add('activo');
            btn.onclick = () => mostrarPagina(i);
            paginacion.appendChild(btn);
        }

        const btnSiguiente = document.createElement('button');
        btnSiguiente.textContent = '▶';
        btnSiguiente.disabled = paginaActual === totalPaginas;
        btnSiguiente.onclick = () => mostrarPagina(paginaActual + 1);
        paginacion.appendChild(btnSiguiente);
    }

    mostrarPagina(1);


});

// Función para mostrar modal de error con mensaje
function mostrarError(mensaje) {
    const modal = document.getElementById('modalError');
    const mensajeError = document.getElementById('mensajeError');
    mensajeError.textContent = mensaje;
    modal.style.display = 'flex';
}

function hora ()
{
    let hora = new Date();

    let h=hora.getHours();
    let m=hora.getMinutes();
    let s=hora.getSeconds();
    let ampm = h >= 12 ? 'PM' : 'AM';
    
    h = h % 12;
    h = h ? h : 12; 

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    document.getElementById("ph").innerHTML="Hora :"+h+" : "+m+" : "+s+"  "+ampm;
    setTimeout("hora()",1000);
}

document.body.setAttribute("onload"," hora()");

function rotacionY(e)
{
    e.style.transform = "rotateY(360deg)";
    e.style.transition = "all 1.5s";
}
function regresar(e)
{
    e.style.transform = "rotateY(0deg)";
    e.style.transition = "all 1s";
}

let redes = document.getElementsByClassName("sociales");
for (let j = 0; j < redes.length; j++) {
    redes[j].setAttribute("onmouseover", "rotacionY(this)");
    redes[j].setAttribute("onmouseout", "regresar(this)");
}