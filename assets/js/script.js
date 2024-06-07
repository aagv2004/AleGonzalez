// IMPORTACIONES
import { registrarContacto, obtenerContacto, actualizarContacto, eliminarContacto } from "./promesas.js";


// Para ejecutar eventos después de que la página se haya cargado en su totalidad.
window.addEventListener("load", ()=> {
    document.getElementById("btnContraste").addEventListener("click", contraste);
    document.getElementById("btnFuente").addEventListener("click", fuente);
    document.getElementById("btnValidar").addEventListener("click", validar);

    document.getElementById("btnEnviar").addEventListener("click", registrar);
    document.getElementById("btnActualizar").addEventListener("click", actualizar);
    document.getElementById("btnEliminar").addEventListener("click", eliminar);
    mostrar()

    // Recupera el botón enviar una vez la página se cargó en su totalidad y lo deshabilita.
    const eBtnEnviar = document.getElementById("btnEnviar");
    eBtnEnviar.disabled = true;
})

// FUNCIONES DE CONSULTA, AGREGACION, ELIMINACION, ACTUALIZACIÓN Y MOSTRAR DE LA BASE DE DATOS

// Función que permite registrar un documento dentro de la base de datos recuperando todos los elementos
// guardando su valor, creando un objeto y llamando a la función "registrarContacto" al finalizar el registro se muestra una alerta de que
// el documento fue registrado con éxito. Se muestran todos los documentos, se limpian los campos y se deshabilita el botón de enviar
// para que el siguiente usuario en ser ingresado deba comprobar sus datos antes de poder enviarlos definitivamente.
const registrar = () => {
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eTelefono = document.getElementById("telefono");
    let eMotivo = document.getElementById("motivo");
    let eInstagram = document.getElementById("instagram");
    let ePaginaweb = document.getElementById("paginaweb");
    let eFacebook = document.getElementById("facebook");
    let eTextarea = document.getElementById("mensaje");


    // Recupero los elementos con el nombre "radio" (type: NodelistOfHtmlElement) y lo transformamos en un array, iteramos el arreglo.
    // Buscamos aquel elemento dentro del array en el cual ".checked === true" y lo guardamos en "radioElegido" esto hará que "elemento.value"
    // Muestre el valor de aquel elemento que está chequeado. En caso contrario mostrará en consola que el elemento no está chequeado y seguirá buscando.
    // (Se declararon como constantes principalmente porque los tipos de variable "let" y "var" en un comienzo no hacía lo esperado)
    let eRadio = document.getElementsByName("radio");
    let eRadioArreglo = Array.from(eRadio);
    for (let index = 0; index < eRadioArreglo.length; index++) {
        const elemento = eRadioArreglo[index];
        const radioElegido = eRadioArreglo[index].checked;
        if (radioElegido === true) {
            var vRadio = elemento.value;
        } else {
            console.log("No está chequeada")
        };
    };

    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vTelefono = eTelefono.value;
    let vMotivo = eMotivo.value;
    let vInstagram = eInstagram.value;
    let vPaginaweb = ePaginaweb.value;
    let vFacebook = eFacebook.value;
    let vTextarea = eTextarea.value;


    let objeto =  {
        nombre:vNombre,
        apellido:vApellido,
        telefono:vTelefono,
        motivo:vMotivo,
        importancia:vRadio,
        instagram:vInstagram,
        paginaweb:vPaginaweb,
        facebook:vFacebook,
        asunto:vTextarea
    };

    registrarContacto(objeto).then(()=> {
        alert("Contacto registrado correctamente.");
        mostrar();
        limpiarFormulario("");
        document.getElementById("btnEnviar").disabled = true;
    }).catch((e) => {
        console.log(e);
    });
};

// Esta función permite mostrar en tiempo real todos los datos
// A través de un bucle consigue recuperar todos los campos que se requieran mostrar
// Y en base a esos campos modifica la estructura HTML para poder ingresarlos dentro de una tabla
// También agrega botones para actualizar y eliminar respectivamente dentro de la misma tabla
const mostrar = () => {
    obtenerContacto().then((contactos) => {
        let estructura = "";
        console.log(contactos);
        contactos.forEach((p) =>{
            estructura += "</tr>";
            estructura += "<td>"+p.nombre+"</td>"; 
            estructura += "<td>"+p.apellido+"</td>";
            estructura += "<td>"+p.telefono+"</td>";
            estructura += "<td>"+p.motivo+"</td>";
            estructura += "<td>"+p.importancia+"</td>";
            estructura += "<td>"+p.instagram+"</td>";
            estructura += "<td>"+p.paginaweb+"</td>";
            estructura += "<td>"+p.facebook+"</td>";
            estructura += "<td>"+p.asunto+"</td>";
            estructura += "<td><button type='button' id='UPD"+p.id+"'>Actualizar</button></td>";
            estructura += "<td><button type='button' id='DEL"+p.id+"'>Eliminar</button></td>";
            estructura += "</tr>";
        });
        document.getElementById("cuerpoTabla").innerHTML = estructura;
        contactos.forEach((p)=>{
        let elemento = document.getElementById("UPD"+p.id);
        elemento.addEventListener("click", ()=> {
            document.getElementById("UPDnombre").value = p.nombre;
            document.getElementById("UPDapellido").value = p.apellido;
            document.getElementById("UPDtelefono").value = p.telefono;
            document.getElementById("UPDmensaje").value = p.asunto;
            document.getElementById("btnActualizar").value = p.id;
            alert("Seleccionaste a: " + p.nombre + " " + p.apellido)
        });
        let elementoEliminar = document.getElementById("DEL"+p.id);
        elementoEliminar.addEventListener("click", () => {
            document.getElementById("btnEliminar").value = p.id;
            document.getElementById("DELnombre").value = p.nombre;
            document.getElementById("DELapellido").value = p.apellido;
            document.getElementById("DELtelefono").value = p.telefono;
            document.getElementById("DELmensaje").value = p.asunto;
            document.getElementById("btnEliminar").value = p.id;
            alert("Vas a eliminar a: " + p.nombre + " " +p.apellido)
        });
    }).catch((e)=>{
        console.log(e)
    })
    });
}

// Función que permite actualizar los datos de un documento elegido por el usuario aquellos datos a cambiar son elegidos con el botón "actualizar" de una tabla
// Cabe destacar que el botón "actualizar" dentro de la tabla recupera todos los documentos que se pensó podrían actualizarse
// A una sección donde el usuario podrá reingresar los nuevos datos a dicha tabla con este botón de actualizar.
const actualizar = ()=>{
    let eNombre = document.getElementById("UPDnombre");
    let eApellido = document.getElementById("UPDapellido");
    let eTelefono = document.getElementById("UPDtelefono");
    let eTextarea = document.getElementById("UPDmensaje");

    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vTelefono = eTelefono.value;
    let vTextarea = eTextarea.value;

    let objeto = {
        nombre:vNombre,
        apellido:vApellido,
        telefono:vTelefono,
        asunto:vTextarea
    }

    let id = document.getElementById("btnActualizar").value;
    actualizarContacto(objeto, id).then(()=>{
        alert("Se actualizó correctamente.")
        mostrar();
        limpiarFormulario("UPD")
    }).catch((e) => {
        console.log(e)
    })
}


// Función que permite eliminar un documento elegido por el usuario por medio del boton "eliminar" de una tabla
// Se recuperan los datos y se muestran en una sección dónde el usuario a través de inputs vacíos podrá revisar lo que quiere eliminar
// A continuación cuando se hace click en el botón eliminar de la sección para eliminar se le preguntará al usuario a través de un confirm si realmente quiere eliminar al contacto.
const eliminar = () => {
    let id = document.getElementById("btnEliminar").value;
    if (confirm("¿Deseas eliminar este contacto?")) {
        eliminarContacto(id).then(()=>{
            alert("Se eliminó correctamente.")
            mostrar()
            limpiarFormulario("DEL")
        }).catch((e) => {
            console.log(e)
        })
    }
}


// Función que recupera elementos y asigna su valor a un campo de texto vacío para "limpiar" inputs dentro del formulario
const limpiarFormulario = (txt)=>{
    let eNombre = document.getElementById(txt+"nombre");
    let eApellido = document.getElementById(txt+"apellido");
    let eTelefono = document.getElementById(txt+"telefono");
    let eTextarea = document.getElementById(txt+"mensaje");

    eNombre.value = "";
    eApellido.value = "";
    eTelefono.value = "";
    eTextarea.value = "";
}

// Función que permite cambiar el color de fondo de la página y el color de la fuente 
function contraste() {
    let elemento = document.getElementById("fondo")
    let eButton = document.getElementsByTagName("button")
    let listadoBotones = Array.from(eButton)
    console.log(listadoBotones)

    if (elemento.style.backgroundColor != "white") {
        elemento.style.backgroundColor = "white"
        elemento.style.color = "black"
        listadoBotones.forEach(botones => {
            botones.style.color = "black"
        });
    
    } else {
        elemento.style.backgroundColor = "black"
        elemento.style.color = "white"
        listadoBotones.forEach(botones => {
            botones.style.color = "black"
        });
    
    }
};


// Función que permite cambiar el tamaño de la fuente de la página
function fuente() {
    let eFuente = document.getElementById("fondo");
    let eBotones = document.getElementsByTagName("button")
    let eInput = document.getElementsByTagName("input");
    let eMotivo = document.getElementById("motivo");
    let eMensaje = document.getElementById("mensaje");


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
        eMensaje.style.fontSize = "15px";

    }
}

// --------------        VALIDACIONES         ------------------------
    

// Llama a las funciones que validan los datos y crea una función de validación que se inicializa en true
// después se reasignan valores booleanos a esa misma variable para saber si todas las validaciones realmente validaron
// finalmente se llama al botón de envío para activarlo o desactivarlo. "!valido" indica que será lo contrario de la variable valido
// es decir si "valido = true", entonces "!valido = false" y viceversa.
const validar = ()=> {
    let valido = true;
    valido = validarTextarea("mensaje") && valido;
    valido = validarVacio("nombre") && valido;
    valido = validarVacio("apellido") && valido;
    valido = validarVacio("telefono") && valido;
    valido = esNumerico("telefono") && valido;
    valido = validarSelect("motivo") && valido;
    document.getElementById("btnEnviar").disabled = !valido;
}

// Valida que X campo no esté vacío, si lo está cambiará el color del fondo del campo a un rojo claro
// Y entregará un mensaje de error.
function validarVacio(idCampo) {
    let elemento = document.getElementById(idCampo);
    let valor = elemento.value;
    let valorSinEspacios = valor.trim();
    let eSpanValor = document.getElementById("p"+idCampo);
    if (valorSinEspacios != "" && valorSinEspacios.length > 3) {
        elemento.style.backgroundColor = "#85b789"
        eSpanValor.style.display = "none"
        return true
    } else {
        elemento.style.backgroundColor = "#c21e56"
        eSpanValor.style.display = "inline"
        return false
    }
}


// Solamente funciona para la validación del campo "teléfono" pues no hay ningún otro que requiera de su uso.
// Valida que el campo "telefono" sea realmente un número telefónico y no cualquier cosa.
// De no serlo, se enviará un mensaje sugiriendole al usuario que utilice (+569) + su numero de telefono sin espacios ni guiones.
function esNumerico(idCampo) {
    let elemento = document.getElementById(idCampo);
    let vElemento = elemento.value;
    let eParrafoValor = document.getElementById("longitud" + idCampo);
    let vElementoSinEspacios = vElemento.trim();
    if (isFinite(vElementoSinEspacios) === true && vElementoSinEspacios.length>0) {
        console.log(vElemento + ", Es un número importante");
        elemento.style.backgroundColor = "#85b789";
        eParrafoValor.style.display = "none";
        return true
    } else {
        console.log(vElemento + ", Es un impostor!")
        elemento.style.backgroundColor = "#c21e56";
        eParrafoValor.style.display = "block";
        return false
    }
}

// Valida que el select no se envíe con el valor 0
// Cambiando el color de los bordes y mostrando un mensaje de que el campo es obligatorio
// Ya que se requiere saber cuál es el motivo por el que debo contactarlo
function validarSelect(idCampo) {
    let elemento = document.getElementById(idCampo);
    let vElemento = elemento.value;
    let eSpanValor = document.getElementById("p"+idCampo);
    if (vElemento == "0") {
        elemento.style.border = "1px solid #c21e56"
        eSpanValor.style.display = "inline"
        return false
    } else {
        elemento.style.border = ""
        eSpanValor.style.display = "none"
        return true
    }
}

// Valida que el textarea tenga algo escrito ya que se busca que el usuario deje el asunto por el cual quiere contactarse
// para ello verifica si es que lo recuperado es igual a "" un string vacío
function validarTextarea(idCampo) {
    let elemento = document.getElementById(idCampo);
    let vElemento = elemento.value;
    let vElementoSinEspacios = vElemento.trim()
    let eSpanValor = document.getElementById("p"+idCampo);
    if (vElementoSinEspacios == ""){
        elemento.style.border = "1px solid #c21e56"
        eSpanValor.style.display = "inline"
        return false
    } else {
        elemento.style.border = ""
        eSpanValor.style.display = "none"
        return true
    }
}
