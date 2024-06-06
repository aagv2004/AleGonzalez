// Importaciones 
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
import { db } from "./firebase.js"

// Promesa de registro de una persona al formulario de contacto
export const registrarContacto = async(contacto) => {
    console.log(contacto)
    const docRef = await addDoc(collection(db, "contactos"), contacto);
}