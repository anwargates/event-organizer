import {Order} from '@/models/orders';
import {Injectable} from '@angular/core';
import {
    collection,
    collectionData,
    doc,
    Firestore,
    updateDoc
} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private productsCollection = collection(this.firestore, 'products');

    constructor(private firestore: Firestore) {}

    getProducts(): Observable<any[]> {
        return collectionData(this.productsCollection, {idField: 'id'});
    }

    updateProducts(id: string, products: any) {
        const orderDocRef = doc(this.firestore, `products/${id}`);
        return updateDoc(orderDocRef, products);
    }
}
