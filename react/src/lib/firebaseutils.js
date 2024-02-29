import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase-config"

export const getProducts = async () => {
    const response = await getDocs(collection(db, "products"))
    return response.docs.map((doc) => ({...doc.data(), id: doc.id,}))
};
export const getCategories = async () => {
    const response = await getDocs(collection(db, "categories"))
    return response
}

export const getSizes = async () => {
    const response = await getDocs(collection(db, "sizes"))
    return response
}
