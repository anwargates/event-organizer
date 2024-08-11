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
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
    paymentForm: FormGroup;
    order: any;
    isReady: boolean = false;
    qrCodeUrl: string = 'assets/images/qr-code.png'; // Replace with actual QR code URL
    accountNumber: string = '123456789';
    private storage = inject(Storage);

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private orderService: OrdersService,
        private toastr: ToastrService
    ) {
        this.paymentForm = this.fb.group({
            proofOfPayment: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.loadOrderData();
        console.log('order', this.order);
    }

    async loadOrderData() {
        await new Promise((resolve) => setTimeout(resolve, 0)); // micro-task queue adjustment
        this.order = history.state.order;

        if (!this.order) {
            console.error('Order data not found');
            this.router.navigate(['/products']);
            this.isReady = false;
        } else {
            console.log('Order data received', this.order);
            this.isReady = true;
        }
    }

    handleFile(event: any) {
        this.paymentForm.get('proofOfPayment')?.setValue(event.target.files[0]);
    }

    onSubmit(): void {
        console.log(this.paymentForm);
        console.log(this.paymentForm.get('proofOfPayment')?.value);
        if (this.paymentForm.invalid) {
            return;
        }
        this.uploadProof();
    }

    uploadProof(): void {
        try {
            const file = this.paymentForm.get('proofOfPayment')?.value;
            const filePath = `proofOfPayments/${Date.now()}_${file.name}`;
            const fileRef = ref(this.storage, filePath);
            const uploadTask = uploadBytesResumable(fileRef, file);

            uploadTask.then(() => {
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
            status: 'SUDAH BAYAR'
        };

        this.orderService
            .updateOrder(this.order.id, updatedOrder)
            .then(() => {
                console.log('Proof of payment uploaded and order updated');
                this.toastr.success(
                    'Proof of payment uploaded and order updated, please wait for WhatsApp confirmation'
                );
                this.router.navigate(['/payment-confirm'], {
                    state: {order: updatedOrder}
                });
            })
            .catch((error) => {
                console.error('Error updating order: ', error);
                this.toastr.error('Error updating order');
            });
    }
}
