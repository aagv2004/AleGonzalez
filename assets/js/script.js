import { registrarContacto } from "./promesas.js";

window.addEventListener("load", ()=> {
    document.getElementById("btnContraste").addEventListener("click", contraste);
    document.getElementById("btnFuente").addEventListener("click", fuente);

    document.getElementById("btnEnviar").addEventListener("click", registrar)
})


// Función que permite registrar
const registrar = () => {
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eTelefono = document.getElementById("telefono");
    let eMotivo = document.getElementById("motivo");
    let eCheckbox = document.getElementsByTagName("asuntoImportante");


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
    console.log(eFuente.style.fontSize)
    console.log(eInput);
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
    }
    
    return eInput
}
    