import {Order} from '@/models/orders';
import {Products} from '@/models/products';
import {Component, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AddProductsDialogComponent} from '@components/modals/add-products-dialog/add-products-dialog.component';
import { DeleteConfirmationDialogComponent } from '@components/modals/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {EditProductsDialogComponent} from '@components/modals/edit-products-dialog/edit-products-dialog.component';
import {OrderProofDialogComponentComponent} from '@components/modals/order-proof-dialog-component/order-proof-dialog-component.component';
import {OrdersService} from '@services/orders.service';
import {ProductsService} from '@services/products.service';
import {Toast, ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-table-products',
    templateUrl: './table-products.component.html',
    styleUrl: './table-products.component.scss'
})
export class TableProductsComponent {
    products: Products[] = [];
    displayedColumns: string[] = [
        'title',
        'location',
        'duration',
        'maxGuests',
        'amenities',
        'price',
        'orderProof',
        'actions'
    ];
    dataSource = new MatTableDataSource<Products>(this.products);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private productsService: ProductsService,
        public dialog: MatDialog,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.productsService.getProducts().subscribe((data) => {
            const convertTimestamp = (timestamp: {
                seconds: number;
                nanoseconds: number;
            }): Date => {
                return new Date(
                    timestamp.seconds * 1000 + timestamp.nanoseconds / 1_000_000
                );
            };

            console.log(data);
            this.products = data.map((e) => {
                return {
                    id: e.id,
                    details: {
                        duration: e.details.duration,
                        location: e.details.location,
                        amenities: e.details.amenities,
                        maxGuests: e.details.maxGuests
                    },
                    title: e.title,
                    detailsUrl: e.detailsUrl,
                    imageUrl: e.imageUrl,
                    type: e.type,
                    price: e.price,
                    category: e.category
                } as Products;
            });
            this.dataSource.data = this.products;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    deleteProduct(orderId: string) {
        const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.productsService
                    .deleteProduct(orderId)
                    .then(() => {
                        console.log('Order deleted successfully');
                        this.toastr.success('Order deleted successfully');
                        // this.refreshOrders();
                    })
                    .catch((error) => {
                        console.error('Failed to delete order', error);
                        this.toastr.error('Failed to delete order');
                    });
            }
        });
    }

    openDialog(buktiPesanan: string): void {
        this.dialog.open(OrderProofDialogComponentComponent, {
            data: {buktiPesanan}
        });
    }

    openEditDialog(product: any) {
        this.dialog.open(EditProductsDialogComponent, {
            data: product
        });
    }

    openAddDialog() {
        this.dialog.open(AddProductsDialogComponent);
    }
}
