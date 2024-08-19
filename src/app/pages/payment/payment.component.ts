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
    qrLogo: string =
        'https://firebasestorage.googleapis.com/v0/b/event-organizer-2784f.appspot.com/o/QR.png?alt=media&token=9caab017-22e4-4ebb-8242-e490dfa5e897';
    briLogo: string =
        'https://firebasestorage.googleapis.com/v0/b/event-organizer-2784f.appspot.com/o/BRI.png?alt=media&token=7a9e2009-c83f-40bc-a542-1a6d1dee459c';
    mandiriLogo: string =
        'https://firebasestorage.googleapis.com/v0/b/event-organizer-2784f.appspot.com/o/Mandiri.png?alt=media&token=3bb6441c-5013-433e-8765-1157a10480f6';
    bcaLogo: string =
        'https://firebasestorage.googleapis.com/v0/b/event-organizer-2784f.appspot.com/o/BCA.png?alt=media&token=cab9ab56-4b6e-4c57-8c4b-25bda67a5a7e';
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
