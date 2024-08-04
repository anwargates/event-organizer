// import {Product} from '@/models/product';
import {Component, ViewChild} from '@angular/core';
import {TableOrdersComponent} from '@components/table/table-orders/table-orders.component';
// import {ModalFormProductsComponent} from '@components/modal-form-products/modal-form-products.component';
import {OrdersService} from '@services/orders.service';
// import {ProductService} from '@services/product.service';
import {Modal} from 'bootstrap';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss'
})
export class OrdersComponent {
    modalInstance: Modal | null = null;
    @ViewChild(TableOrdersComponent)
    tableOrdersComponent!: TableOrdersComponent;
    // @ViewChild(ModalFormProductsComponent)
    // modalForm!: ModalFormProductsComponent;

    constructor(private ordersService: OrdersService) {}

    openModal() {
        const modalElement = document.getElementById('productModal');
        if (modalElement) {
            this.modalInstance = new Modal(modalElement);
            this.modalInstance.show();
        }
    }

    // openModalEdit(product: Product) {
    //     console.log('modal opening');
    //     const modalElement = document.getElementById('productModal');
    //     if (modalElement) {
    //         this.modalInstance = new Modal(modalElement);
    //         this.modalForm.productForm.setValue(product);
    //         this.modalInstance.show();
    //     }
    // }

    doRefreshTable() {
        // this.ordersComponent.refreshTable();
    }
}
