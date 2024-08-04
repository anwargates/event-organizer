import {Order} from '@/models/orders';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppService} from '@services/app.service';
import {OrdersService} from '@services/orders.service';
import {firebaseAuth} from '@/firebase';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
    product: any;
    checkoutForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private ordersService: OrdersService,
        private appService: AppService
    ) {
        const navigation = this.router.getCurrentNavigation();
        this.product = navigation?.extras.state?.event;

        this.checkoutForm = this.fb.group({
            tanggalEventMulai: ['', Validators.required],
            tanggalEventAkhir: ['', Validators.required]
        });
    }

    ngOnInit(): void {}

    proceedToPayment(): void {
        if (this.checkoutForm.valid) {
            const formData = this.checkoutForm.value;
            const newOrder: Order = {
                userId: firebaseAuth.currentUser.uid,
                productId: this.product.id,
                tanggalPesanan: new Date(),
                tanggalEventMulai: formData.tanggalEventMulai,
                tanggalEventAkhir: formData.tanggalEventAkhir,
                status: 'PENDING',
                buktiPesanan: '' // Assuming this is handled later in the process
            };

            console.log('newOrder', newOrder);
            this.ordersService
                .createOrder(newOrder)
                .then((docRef) => {
                    console.log('Order created successfully');
                    this.checkoutForm.reset();
                    this.router.navigate(['/payment'], {
                        state: {order: {...newOrder, id: docRef.id}}
                    });
                })
                .catch((error) => {
                    console.error('Error creating order: ', error);
                });
        } else {
            console.error('Form is invalid');
        }
    }
}
