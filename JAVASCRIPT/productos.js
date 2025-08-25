
document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('input[name="categoria"]');
    const productos = document.querySelectorAll('.producto1');
    const mensajeVacio = document.getElementById("mensajeVacio");
    const botonMostrarMas = document.getElementById("mostrar-mas");


    let mostrandoMas = false; // Controla si se están mostrando todos los productos


    function filtrarProductos() {
        const categoriasSeleccionadas = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        let hayResultados = false;
        botonMostrarMas.style.display = "none";

        productos.forEach((producto, index) => {
            const categoria = producto.getAttribute("data-categoria");
            if (categoriasSeleccionadas.includes(categoria)) {
                if (categoria === "pasteles") {
                    if (!mostrandoMas && index >= 6) {
                        producto.style.display = "none";
                    } else {
                        producto.style.display = "block";
                        hayResultados = true;
                    }
                } else {
                    producto.style.display = "block";
                    hayResultados = true;
                }
            } else {
                producto.style.display = "none";
            }
        });

        // Mostrar el botón solo si la categoría pasteles está seleccionada y hay más de 6 productos
        if (categoriasSeleccionadas.includes("pasteles")) {
            const totalPasteles = Array.from(productos).filter(p => p.getAttribute("data-categoria") === "pasteles").length;
            if (totalPasteles > 6) {
                botonMostrarMas.style.display = "block";
                botonMostrarMas.textContent = mostrandoMas ? "Mostrar menos" : "Mostrar más";
            } else {
                botonMostrarMas.style.display = "none";
            }
        } else {
            botonMostrarMas.style.display = "none";
        }

        if (!hayResultados) {
            mensajeVacio.style.display = "block";
        } else {
            mensajeVacio.style.display = "none";
        }
    }

    botonMostrarMas.addEventListener("click", () => {
        mostrandoMas = !mostrandoMas;
        filtrarProductos();
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            mostrandoMas = false;  // resetear cuando cambian filtros
            filtrarProductos();
        });
    });

    filtrarProductos();
});

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