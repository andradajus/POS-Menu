import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebase-config"

export const getProducts = async () => {
    const response = await getDocs(collection(db, "products"))
    return response.docs.map((doc) => ({...doc.data(), id: doc.id,}))
};

export const addProducts = async (formData) => {
    await addDoc(collection(db, "products"), formData)
}

export const updateProducts = async (id, formData) => {
    const productRef = doc(db, "products", id);
    console.log("Update Products", formData)
    await updateDoc(productRef, formData);
    };
export const getCategories = async () => {
    const response = await getDocs(collection(db, "categories"))
    return response
}

export const getSizes = async () => {
    const response = await getDocs(collection(db, "sizes"))
    return response
}

