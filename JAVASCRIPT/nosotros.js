function color()
{
    let x = Math.floor(Math.random() * 181);
    let y = Math.floor(Math.random() * 181);
    let z = Math.floor(Math.random() * 181);

    document.getElementById("titulo-nosotros").style.color="rgb("+x+", "+y+", "+z+")";
    setTimeout("color()",1500);
}

var i=0
function carrusel()
{
    i++
    if(i>7) i=1;

    document.getElementById("carrusel").setAttribute("src","imagenes/IMG"+i+".jpg");
    setTimeout("carrusel()",1500);

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

document.body.setAttribute("onload", "color(), carrusel(), hora()");

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