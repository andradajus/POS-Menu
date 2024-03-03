import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase-config"

export const logTransaction = async (method, product) => {
    await addDoc(collection(db, "transactions"),
    {
        date: serverTimestamp(),
        description: `${method} ${product}`,
    })
}
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
    await logTransaction("Added", formData.name)
}

export const updateProduct = async (id, formData) => {
    const productRef = doc(db, "products", id)
    await updateDoc(productRef, formData)
    await logTransaction("Updated", formData.name)
};

export const deleteProduct = async (name, id) => {
    const productRef = doc(db, "products", id)
    await deleteDoc(productRef)
    await logTransaction("Deleted", name)
}
export const getCategories = async () => {
    const response = await getDocs(collection(db, "categories"))
    return response.docs.map((doc) => ({...doc.data(), id: doc.id,}))
}

export const addCategories = async (formData) => {
    await addDoc(collection(db, "categories"), formData)
    await logTransaction("Added category", formData.name)
}

export const getSizes = async () => {
    const response = await getDocs(collection(db, "sizes"))
    return response.docs.map((doc) => ({...doc.data(), id: doc.id,}))
}

export const addSizes = async (formData) => {
    await addDoc(collection(db, "sizes"), formData)
    await logTransaction("Added size", formData.name)
}

export const getTransactions = async () => {
    const response = await getDocs(collection(db, "transactions"))
    return response.docs.map((doc) => ({...doc.data(), id: doc.id,}))
}
