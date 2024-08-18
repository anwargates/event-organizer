// dashboard.component.ts
import {Component} from '@angular/core';
import {
    faBookmark,
    faEnvelope,
    faChartSimple,
    faCartShopping,
    faUserPlus,
    faChartPie
} from '@fortawesome/free-solid-svg-icons';
import {OrdersService} from '@services/orders.service';
import {ProductsService} from '@services/products.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    faBookmark = faBookmark;
    faEnvelope = faEnvelope;
    faChartSimple = faChartSimple;
    faCartShopping = faCartShopping;
    faUserPlus = faUserPlus;
    faChartPie = faChartPie;

    onPayment: number = 0;

    constructor(private orderService: OrdersService) {
        this.orderService
            .countOrderByParameter('status', 'SUDAH BAYAR')
            .subscribe((count) => {
                console.log(`Number of PAYMENT status: ${count}`);
                this.onPayment = count;
            });
    }
}
