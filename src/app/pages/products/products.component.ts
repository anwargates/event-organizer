import {Products} from '@/models/products';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService} from '@services/products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent {
    weddings: Products[] = [];
    meetings: Products[] = [];
    musics: Products[] = [];

    weddingMinPrice: number = 0;
    weddingMaxPrice: number = 0;
    meetingMinPrice: number = 0;
    meetingMaxPrice: number = 0;
    musicMinPrice: number = 0;
    musicMaxPrice: number = 0;

    constructor(
        private productsService: ProductsService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.productsService
            .getProductsByCategory('Wedding')
            .subscribe((data) => {
                this.weddings = data.products;
                this.weddingMinPrice = data.minPrice;
                this.weddingMaxPrice = data.maxPrice;
            });
        this.productsService
            .getProductsByCategory('Music Entertainment')
            .subscribe((data) => {
                this.musics = data.products;
                this.musicMinPrice = data.minPrice;
                this.musicMaxPrice = data.maxPrice;
            });
        this.productsService
            .getProductsByCategory('Meeting & Conference')
            .subscribe((data) => {
                this.meetings = data.products;
                this.meetingMinPrice = data.minPrice;
                this.meetingMaxPrice = data.maxPrice;
            });
    }

    order(event: any): void {
        this.router.navigate(['/checkout'], {state: {event}});
    }
}
