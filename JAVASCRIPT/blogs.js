document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".formulario-reseña form");
    const mensajeExito = document.createElement("p");

    mensajeExito.style.color = "green";
    mensajeExito.style.fontWeight = "bold";
    mensajeExito.style.textAlign = "center";
    mensajeExito.style.marginTop = "10px";
    mensajeExito.style.display = "none"; // oculto inicialmente
    mensajeExito.textContent = "✅ Reseña enviada con éxito";

    form.appendChild(mensajeExito);

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // evita recargar la página
        mensajeExito.style.display = "block"; // muestra el mensaje
        form.reset(); // limpia el formulario
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".formulario-reseña form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre-usuario").value;
        const ciudad = document.getElementById("ciudad-usuario").value;
        const mensaje = document.getElementById("mensaje-reseña").value;

        const nuevaReseña = document.createElement("div");
        nuevaReseña.className = "columna-reseña";
        nuevaReseña.innerHTML = `
            <img src="https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg" style="width:60px; border-radius:50%;">
            <p><strong>${nombre}</strong> - ${ciudad}<br><small>🗓️ ${new Date().toLocaleDateString()}</small></p>
            <p>“${mensaje}”</p>
        `;

        nuevaReseña.style.opacity = 0;
        document.querySelector(".contenedor-reseñas").appendChild(nuevaReseña);

        // Animación de aparición
        setTimeout(() => {
            nuevaReseña.style.transition = "opacity 0.8s";
            nuevaReseña.style.opacity = 1;
        }, 10);

        form.reset();
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".btn-slider.prev");
    const nextBtn = document.querySelector(".btn-slider.next");

    let index = 0;

    function mostrarSlide(nuevoIndex) {
        slides.forEach((slide, i) => {
            slide.classList.remove("activo");
            if (i === nuevoIndex) {
                slide.classList.add("activo");
            }
        });
    }

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        mostrarSlide(index);
    });

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        mostrarSlide(index);
    });


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
