import {Order} from '@/models/orders';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppService} from '@services/app.service';
import {OrdersService} from '@services/orders.service';
import {firebaseAuth} from '@/firebase';
import {ToastrService} from 'ngx-toastr';

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
        private appService: AppService,
        private toastr: ToastrService
    ) {
        const navigation = this.router.getCurrentNavigation();
        this.product = navigation?.extras.state?.event;
        if (this.product == null) {
            this.router.navigate(['/products']);
        }

        this.checkoutForm = this.fb.group({
            tanggalEventMulai: ['', Validators.required],
            tanggalEventAkhir: ['', Validators.required]
        });
    }

    ngOnInit(): void {}

    async proceedToPayment(): Promise<void> {
        if (this.checkoutForm.valid) {
            await this.appService.getPhoneNumber();
            console.log('Phone Number Here', this.appService.phoneNumber);

            const formData = this.checkoutForm.value;
            const newOrder: Order = {
                userId: firebaseAuth.currentUser.uid,
                userName: firebaseAuth.currentUser.displayName,
                productId: this.product.id,
                productName: this.product.title,
                tanggalPesanan: new Date(),
                tanggalEventMulai: formData.tanggalEventMulai,
                tanggalEventAkhir: formData.tanggalEventAkhir,
                status: 'BELUM BAYAR',
                buktiPesanan: '', // Assuming this is handled later in the process
                komentar: '',
                phoneNumber: this.appService.phoneNumber
            };

            console.log('newOrder', newOrder);
            this.ordersService
                .createOrder(newOrder)
                .then((docRef) => {
                    console.log('Order created successfully :', newOrder);
                    this.toastr.success(
                        'Order created successfully, silakan lakukan pembayaran'
                    );
                    this.checkoutForm.reset();
                    this.router.navigate(['/payment'], {
                        state: {order: {...newOrder, id: docRef.id}}
                    });
                })
                .catch((error) => {
                    console.error('Error creating order: ', error);
                    this.toastr.error('Error creating order');
                });
        } else {
            console.error('Form is invalid');
            this.toastr.error('Form is invalid');
        }
    }
}
