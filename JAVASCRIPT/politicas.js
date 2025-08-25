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