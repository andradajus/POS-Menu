import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase-config"

export const getProducts = async () => {
    const response = await getDocs(collection(db, "products"))
    return response.docs.map((doc) => ({...doc.data(), id: doc.id,}))
};

export const getProducyById = async (id) => {
    const response = await getDocs(collection(db, "products"))
    return response.docs.map((doc) => ({...doc.data(), id: doc.id,})).find(product => product.id === id)
}

export const addProducts = async (formData) => {
    await addDoc(collection(db, "products"), formData)
}

export const updateProduct = async (id, formData) => {
    const productRef = doc(db, "products", id)
    await updateDoc(productRef, formData)
    console.log("product updated")
};

export const deleteProduct = async (id) => {
    const productRef = doc(db, "products", id)
    await deleteDoc(productRef)
    console.log("product deleted")
}
export const getCategories = async () => {
    const response = await getDocs(collection(db, "categories"))
    return response.docs.map((doc) => ({...doc.data(), id: doc.id,}))
}

export const addCategories = async (formData) => {
    await addDoc(collection(db, "categories"), formData)
}

export const getSizes = async () => {
    const response = await getDocs(collection(db, "sizes"))
    return response.docs.map((doc) => ({...doc.data(), id: doc.id,}))
}

export const addSizes = async (formData) => {
    await addDoc(collection(db, "sizes"), formData)
}


