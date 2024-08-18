import {Order} from '@/models/orders';
import {Products} from '@/models/products';
import {Injectable} from '@angular/core';
import {
    addDoc,
    collection,
    collectionData,
    deleteDoc,
    doc,
    Firestore,
    updateDoc
} from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private productsCollection = collection(this.firestore, 'products');

    constructor(private firestore: Firestore) {}

    getProducts(): Observable<any[]> {
        return collectionData(this.productsCollection, {idField: 'id'});
    }

    getProductsByCategory(
        category: string
    ): Observable<{products: Products[]; minPrice: number; maxPrice: number}> {
        return this.getProducts().pipe(
            map((products) => {
                const filteredProducts = products.filter(
                    (product) => product.category === category
                );
                const prices = filteredProducts.map((product) => product.price);
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);

                return {
                    products: filteredProducts,
                    minPrice: minPrice,
                    maxPrice: maxPrice
                };
            })
        );
    }

    createProduct(product: any) {
        return addDoc(this.productsCollection, product);
    }

    updateProducts(id: string, products: any) {
        const orderDocRef = doc(this.firestore, `products/${id}`);
        return updateDoc(orderDocRef, products);
    }

    deleteProduct(productId: string) {
        const orderDocRef = doc(this.firestore, `products/${productId}`);
        return deleteDoc(orderDocRef);
    }

    countProductsByParameter(
        parameter: keyof Products,
        value: any
    ): Observable<number> {
        return this.getProducts().pipe(
            map(
                (products) =>
                    products.filter((product) => product[parameter] === value)
                        .length
            )
        );
    }
}
