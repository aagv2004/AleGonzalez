// Importaciones 
import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
import { db } from "./firebase.js"

// Promesa de registro de una persona al formulario de contacto
export const registrarContacto = async(contacto) => {
    console.log(contacto)
    const docRef = await addDoc(collection(db, "contactos"), contacto);
}

export const obtenerContacto = async() => {
    const referencia = collection(db, "contactos");
    const querySnapshot = await getDocs(referencia);
    console.log(querySnapshot);
    let contacto = []
    querySnapshot.forEach((doc) => {
        contacto.push({...doc.data(), id:doc.id})
    });
    return contacto
}

export const actualizarContacto = async(contacto, id) => {
    const ref = doc(db, "contactos", id);
    await updateDoc(ref, contacto);
}

export const eliminarContacto = async(id) => {
    const ref = doc(db, "contactos", id);
    await deleteDoc(ref);
}