import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {finalize} from 'rxjs';
import {
    Storage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from '@angular/fire/storage';
import {OrdersService} from '@services/orders.service';
import {error} from 'console';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
    paymentForm: FormGroup;
    order: any;
    qrCodeUrl: string = 'assets/images/qr-code.png'; // Replace with actual QR code URL
    accountNumber: string = '123456789';
    private storage = inject(Storage);

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private orderService: OrdersService
    ) {
        const navigation = this.router.getCurrentNavigation();
        this.order = navigation?.extras.state?.order;

        this.paymentForm = this.fb.group({
            proofOfPayment: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        console.log("order",this.order);
        
    }

    uploadProof(event: any): void {
        try {
            const file = event.target.files[0];
            const filePath = `proofOfPayments/${Date.now()}_${file.name}`;
            const fileRef = ref(this.storage, filePath);
            const uploadTask = uploadBytesResumable(fileRef, file);
            uploadTask.then((snapshot) => {
                getDownloadURL(fileRef)
                    .then((url) => {
                      console.log(`Download URL: ${url}`);
                        this.saveProofOfPayment(url);
                    })
                    .catch((error) => {
                        console.error(`Error getting download URL: ${error}`);
                    });
            });
        } catch (e) {
            console.error(e);
        }
    }

    saveProofOfPayment(url: string): void {
        const updatedOrder = {
            ...this.order,
            buktiPesanan: url,
            status: "PAYMENT",
        };

        this.orderService
            .updateOrder(this.order.id, updatedOrder)
            .then(() => {
                console.log('Proof of payment uploaded and order updated');
                this.router.navigate(['/confirmation'], {
                    state: {order: updatedOrder}
                });
            })
            .catch((error) => {
                console.error('Error updating order: ', error);
            });
    }
}
