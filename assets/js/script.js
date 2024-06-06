import { registrarContacto } from "./promesas.js";

window.addEventListener("load", ()=> {
    document.getElementById("btnContraste").addEventListener("click", contraste);
    document.getElementById("btnFuente").addEventListener("click", fuente);
    document.getElementById("btnEnviar").addEventListener("click", registrar);
})

// Función que permite registrar
const registrar = () => {
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eTelefono = document.getElementById("telefono");
    let eMotivo = document.getElementById("motivo");
    let eInstagram = document.getElementById("instagram");
    let ePaginaweb = document.getElementById("paginaweb");
    let eFacebook = document.getElementById("facebook");


    // Recupero los elementos con el nombre "radio" (type: NodelistOfHtmlElement) y lo transformamos en un array, iteramos el arreglo.
    // Buscamos aquel elemento dentro del array en el cual ".checked === true" y lo guardamos en "radioElegido" esto hará que "elemento.value"
    // Muestre el valor de aquel elemento que está chequeado. En caso contrario mostrará en consola que el elemento no está chequeado y seguirá buscando.
    // (Se declararon como constantes principalmente porque los tipos de variable "let" y "var" en un comienzo no hacía lo esperado)
    let eRadio = document.getElementsByName("radio");
    let eRadioArreglo = Array.from(eRadio)
    for (let index = 0; index < eRadioArreglo.length; index++) {
        const elemento = eRadioArreglo[index];
        const radioElegido = eRadioArreglo[index].checked;
        if (radioElegido === true) {
            var vRadio = elemento.value;
        } else {
            console.log("No está chequeada")
        }
    }

    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vTelefono = eTelefono.value;
    let vMotivo = eMotivo.value;
    let vInstagram = eInstagram.value;
    let vPaginaweb = ePaginaweb.value;
    let vFacebook = eFacebook.value;

    validarVacio("nombre")
    validarVacio("apellido")
    validarVacio("telefono")

    let objeto = {
        nombre:vNombre,
        apellido:vApellido,
        telefono:vTelefono,
        motivo:vMotivo,
        importancia:vRadio,
        instagram:vInstagram,
        paginaweb:vPaginaweb,
        facebook:vFacebook
    }



    registrarContacto(objeto).then(()=> {
        alert("Contacto registrado correctamente.")
    }).catch((e) => {
        console.log(e)
    })
}



// Función que permite cambiar el color de fondo de la página y el color de la fuente 
function contraste() {
    let elemento = document.getElementById("fondo")
    if (elemento.style.backgroundColor != "white") {
        elemento.style.backgroundColor = "white"
        elemento.style.color = "black"
    } else {
        elemento.style.backgroundColor = "black"
        elemento.style.color = "white"
    }
};


// Función que permite cambiar el tamaño de la fuente de la página
function fuente() {
    let eFuente = document.getElementById("fondo");
    let eBotones = document.getElementsByTagName("button")
    let eInput = document.getElementsByTagName("input");
    let eMotivo = document.getElementById("motivo")
    let eMensaje = document.getElementById("mensaje")
    console.log(eFuente.style.fontSize)
    console.log(typeof(eInput));

    if (eFuente.style.fontSize != "30px"){
        // Bucle "for in" que permite acceder a los índices del objeto, en este caso llamado "eInput" de tipo <HTMLCollection>
        for (const e in eInput) {
            if (eInput.hasOwnProperty.call(eInput, e)) {
                const element = eInput[e];
                element.style.fontSize = "30px";
            }
        }
        for (const b in eBotones) {
            if (eBotones.hasOwnProperty.call(eBotones, b)) {
                const element = eBotones[b];
                element.style.fontSize = "30px";
            }
        }
        eFuente.style.fontSize = "30px";
        eMotivo.style.fontSize = "30px";
        eMensaje.style.fontSize = "30px";
    } else {
        // Bucle "for in" que permite acceder a los índices del objeto, en este caso llamado "eInput" de tipo <HTMLCollection>
        for (const e in eInput) {
            if (eInput.hasOwnProperty.call(eInput, e)) {
                const element = eInput[e];
                element.style.fontSize = "15px";
                
            }
        }
        for (const b in eBotones) {
            if (eBotones.hasOwnProperty.call(eBotones, b)) {
                const element = eBotones[b];
                element.style.fontSize = "15px";
                
            }
        }
        eFuente.style.fontSize = "15px";
        eMotivo.style.fontSize = "15px";
        eMensaje.style.fontSize = "15px"
    }
    
    return eInput
}
    

function validarVacio(idCampo) {
    let elemento = document.getElementById(idCampo);
    let valor = elemento.value;
    let valorSinEspacios = valor.trim();
    let eParrafoValor = document.getElementById("p"+idCampo);
    if (valorSinEspacios != "") {
        elemento.style.backgroundColor = "#85b789"
        eParrafoValor.style.display = "inline"
    } else {
        elemento.style.backgroundColor = "#c21e56"
        eParrafoValor.style.display = "none"
    }
}