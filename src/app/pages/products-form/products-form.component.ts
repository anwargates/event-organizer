import {Order} from '@/models/orders';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OrdersService} from '@services/orders.service';

@Component({
    selector: 'app-products-form',
    templateUrl: './products-form.component.html',
    styleUrl: './products-form.component.scss'
})
export class ProductsFormComponent {
    productsForm!: FormGroup;
    isDisable: boolean = true;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private ordersService: OrdersService
    ) {
        this.productsForm = this.fb.group({
            id: ['', Validators.required],
            price: ['', Validators.required],
        });
    }
    onSubmit(): void {
        console.log(this.productsForm);
        if (this.productsForm.valid) {
            const newOrder: Order = this.productsForm.value;
            console.log('newOrder', newOrder);
            this.ordersService.createOrder(newOrder).then(() => {
                console.log('Order created successfully');
                this.productsForm.reset();
                this.router.navigate(['/products']);
            });
        } else {
            console.log('Form not valid');
        }
    }
}
