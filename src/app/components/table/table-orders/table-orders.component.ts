import {Order} from '@/models/orders';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {ConfirmationModalComponent} from '@components/modals/confirmation-modal/confirmation-modal.component';
import {DeleteConfirmationDialogComponent} from '@components/modals/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {OrderProofDialogComponentComponent} from '@components/modals/order-proof-dialog-component/order-proof-dialog-component.component';
import {AppService} from '@services/app.service';
import {OrdersService} from '@services/orders.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-table-orders',
    templateUrl: './table-orders.component.html',
    styleUrls: ['./table-orders.component.scss']
})
export class TableOrdersComponent implements OnInit {
    orders: Order[] = [];
    displayedColumns: string[] = [
        'userId',
        'productId',
        'tanggalPesanan',
        'tanggalEventMulai',
        'tanggalEventAkhir',
        'status',
        'buktiPesanan',
        'actions'
    ];
    dataSource = new MatTableDataSource<Order>(this.orders);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private ordersService: OrdersService,
        public dialog: MatDialog,
        private appService: AppService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (this.isAdmin()) {
            // Fetch all orders if the user is an admin
            this.fetchAllOrders();
        } else {
            // Fetch orders specific to the current user if not an admin
            const userId = this.appService.user.uid; // Assume this property provides the current user's ID
            this.fetchOrdersByUserId(userId);
        }
    }

    fetchAllOrders(): void {
        this.ordersService.getOrders().subscribe((data) => {
            this.orders = this.mapOrders(data);
            this.updateTableData();
        });
    }

    fetchOrdersByUserId(userId: string): void {
        this.ordersService.getOrdersByUserId(userId).subscribe((data) => {
            this.orders = this.mapOrders(data);
            this.updateTableData();
        });
    }

    mapOrders(data: any[]): Order[] {
        const convertTimestamp = (timestamp: {
            seconds: number;
            nanoseconds: number;
        }): Date => {
            return new Date(
                timestamp.seconds * 1000 + timestamp.nanoseconds / 1_000_000
            );
        };

        return data.map(
            (e) =>
                ({
                    id: e.id,
                    userId: e.userId,
                    userName: e.userName,
                    productId: e.productId,
                    productName: e.productName,
                    tanggalPesanan: convertTimestamp(e.tanggalPesanan),
                    tanggalEventMulai: convertTimestamp(e.tanggalEventMulai),
                    tanggalEventAkhir: convertTimestamp(e.tanggalEventAkhir),
                    status: e.status,
                    buktiPesanan: e.buktiPesanan
                }) as Order
        );
    }

    updateTableData(): void {
        this.dataSource.data = this.orders;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    deleteOrder(orderId: string) {
        const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.ordersService
                    .deleteOrder(orderId)
                    .then(() => {
                        console.log('Order deleted successfully');
                        this.toastr.success('Order deleted successfully');
                        this.refreshOrders();
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

    openConfirmationDialog(id: string): void {
        this.dialog.open(ConfirmationModalComponent, {data: {id}});
    }

    isAdmin(): boolean {
        return this.appService.role === 'ADMIN';
    }

    isNotPaid(order: Order): boolean {
        return order.status === 'BELUM BAYAR';
    }

    navigateToPayment(order: Order) {
        console.log('Paying order', order);
        this.router.navigate(['/payment'], {state: {order}});
    }

    refreshOrders(): void {
        this.ngOnInit();
    }
}
