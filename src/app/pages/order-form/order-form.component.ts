import {Order} from '@/models/orders';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {OrdersService} from '@services/orders.service';

interface Status {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {
    statusList: Status[] = [
        {value: 'DONE', viewValue: 'DONE'},
        {value: 'PENDING', viewValue: 'PENDING'}
    ];

    orderForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private ordersService: OrdersService
    ) {
        this.orderForm = this.fb.group({
            userId: ['', Validators.required],
            productId: ['', Validators.required],
            tanggalPesanan: [new Date(), Validators.required],
            tanggalEventMulai: ['', Validators.required],
            tanggalEventAkhir: ['', Validators.required],
            status: ['', Validators.required],
            buktiPesanan: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.orderForm.valueChanges.subscribe((value) => {
            console.log(value);
        });
    }

    onSubmit(): void {
        console.log(this.orderForm);
        if (this.orderForm.valid) {
            const newOrder: Order = this.orderForm.value;
            console.log('newOrder', newOrder);
            this.ordersService.createOrder(newOrder).then(() => {
                console.log('Order created successfully');
                this.orderForm.reset();
                this.router.navigate(['/orders']);
            });
        } else {
            console.log('Form not valid');
        }
    }
}
