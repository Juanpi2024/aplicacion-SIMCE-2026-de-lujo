import { db } from './firebase.js';
import { 
    collection, 
    doc, 
    setDoc, 
    getDocs, 
    deleteDoc, 
    query, 
    where,
    writeBatch
} from "firebase/firestore";

// Helper to handle Firestore operations
export const FirebaseService = {
    async saveItem(collectionName, item) {
        if (!item.id) throw new Error("Item must have an ID to save to Firebase");
        const docRef = doc(db, collectionName, item.id);
        await setDoc(docRef, { ...item, updatedAt: new Date().toISOString() }, { merge: true });
        return item;
    },

    async getAll(collectionName, filters = []) {
        let q = collection(db, collectionName);
        if (filters.length > 0) {
            filters.forEach(f => {
                q = query(q, where(f.field, f.op, f.value));
            });
        }
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => doc.data());
    },

    async deleteItem(collectionName, id) {
        await deleteDoc(doc(db, collectionName, id));
    },

    async saveBatch(collectionName, items) {
        const batch = writeBatch(db);
        items.forEach(item => {
            const docRef = doc(db, collectionName, item.id);
            batch.set(docRef, { ...item, updatedAt: new Date().toISOString() }, { merge: true });
        });
        await batch.commit();
        return items;
    }
};
