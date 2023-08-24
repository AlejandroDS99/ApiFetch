
async function data() {

    let resJson;

    let registro = localStorage.getItem("horaRegistrada");

    let ahora = (new Date()).getTime();

    
    if(registro === null) {
        resJson = await cargaDatos(ahora);
        
    }
    else {
       if(ahora - parseInt(registro) <= 60000) {
       resJson = JSON.parse(localStorage.getItem("data"));
       console.log( "Registro era valido y no se cargo nada nuevo");
       }
       else {
        resJson = await cargaDatos(ahora);
       }
    }

    for(let i = 0;  i< 6; i++ ){
        document.getElementById(i + "id").innerHTML = resJson.data[i].id;
        document.getElementById(i + "firstName").innerHTML = resJson.data[i].first_name;
        document.getElementById(i + "lastName").innerHTML = resJson.data[i].last_name;
        document.getElementById(i + "email").innerHTML = resJson.data[i].email;
        document.getElementById(i + "image").src = resJson.data[i].avatar;
    }

   
}

async function cargaDatos (ahora) {
    const url = "https://reqres.in/api/users?delay=3"
    let res = await fetch (url)
    let resJson = await res.json();

    localStorage.setItem("horaRegistrada", ahora);

    localStorage.setItem("data", JSON.stringify(resJson));
    console.log("Se cargan nuevos registros");
    return resJson;   
}

function cargarConSpinner() {
    var boton = document.getElementById("myButton");
    var spinner = document.getElementById("spinner");

    // Desactivar el botón
    boton.disabled = true;

    // Mostrar el spinner
   spinner.style.display = "inline-block";

    // Reactivar el botón y ocultar el spinner después de 3 segundos
    setTimeout(function() {
        boton.disabled = false;
        spinner.style.display = "none";
    }, 3000); // 3000 milisegundos = 3 segundos
}

