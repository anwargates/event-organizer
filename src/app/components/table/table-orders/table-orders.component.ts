import {Order} from '@/models/orders';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {OrderProofDialogComponentComponent} from '@components/modals/order-proof-dialog-component/order-proof-dialog-component.component';
import {OrdersService} from '@services/orders.service';

@Component({
    selector: 'app-table-orders',
    templateUrl: './table-orders.component.html',
    styleUrl: './table-orders.component.scss'
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
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.ordersService.getOrders().subscribe((data) => {
            const convertTimestamp = (timestamp: {
                seconds: number;
                nanoseconds: number;
            }): Date => {
                // Convert seconds to milliseconds and add nanoseconds converted to milliseconds
                return new Date(
                    timestamp.seconds * 1000 + timestamp.nanoseconds / 1_000_000
                );
            };

            console.log(data);
            this.orders = data.map((e) => {
                return {
                    id: e.id,
                    userId: e.userId,
                    productId: e.productId,
                    tanggalPesanan: convertTimestamp(e.tanggalPesanan),
                    tanggalEventMulai: convertTimestamp(e.tanggalEventMulai),
                    tanggalEventAkhir: convertTimestamp(e.tanggalEventAkhir),
                    status: e.status,
                    buktiPesanan: e.buktiPesanan
                } as Order;
            });
            this.dataSource.data = this.orders;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    deleteOrder(orderId: string) {
        this.ordersService.deleteOrder(orderId).then(() => {
            console.log('Order deleted successfully');
        });
    }

    openDialog(buktiPesanan: string): void {
        this.dialog.open(OrderProofDialogComponentComponent, {
            data: {buktiPesanan}
        });
    }
}
