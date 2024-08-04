import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService} from '@services/products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent {
    products: any[] = [];

    constructor(
        private productsService: ProductsService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.productsService.getProducts().subscribe((data) => {
            this.products = data;
            console.log(this.products);
        });
    }

    order(event: any): void {
        this.router.navigate(['/checkout'], {state: {event}});
    }
}
