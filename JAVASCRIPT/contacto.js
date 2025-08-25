

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.formulario-contacto form');
    const inputs = form.querySelectorAll('input, textarea');
    const emailInput = document.getElementById('email');


    form.addEventListener('submit', function (e) {
        e.preventDefault();
        for (let input of inputs) {
            if (!input.value.trim()) {
                mostrarModal('modalErrorCampos');
                return;
            }
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);

        if (!emailValido) {
            mostrarModal('modalError');
            return;
        }

        // Si es válido, mostramos modal de éxito y reiniciamos
        mostrarModal('modalExito');
        form.reset();
    });
});

// Función para mostrar un modal por ID
function mostrarModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Función para cerrar modal
function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
    }
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

