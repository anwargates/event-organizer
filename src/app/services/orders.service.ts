import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
// import {addDoc, collection, deleteDoc, doc, Firestore, updateDoc} from 'firebase/firestore';
import {
    Firestore,
    collectionData,
    docData,
    addDoc,
    collection,
    deleteDoc,
    doc,
    updateDoc,
    query,
    where
} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private ordersCollection = collection(this.firestore, 'orders');

    constructor(private firestore: Firestore) {}

    createOrder(order: any) {
        return addDoc(this.ordersCollection, order);
    }

    getOrders(): Observable<any[]> {
        return collectionData(this.ordersCollection, {idField: 'id'});
    }

    getOrderById(orderId: string): Observable<any> {
        const orderDocRef = doc(this.firestore, `orders/${orderId}`);
        return docData(orderDocRef, {idField: 'id'});
    }

    getOrdersByUserId(userId: string): Observable<any[]> {
        const userOrdersQuery = query(
            this.ordersCollection,
            where('userId', '==', userId)
        );
        return collectionData(userOrdersQuery, {idField: 'id'});
    }

    updateOrder(orderId: string, order: any) {
        const orderDocRef = doc(this.firestore, `orders/${orderId}`);
        return updateDoc(orderDocRef, order);
    }

    deleteOrder(orderId: string) {
        const orderDocRef = doc(this.firestore, `orders/${orderId}`);
        return deleteDoc(orderDocRef);
    }
}
