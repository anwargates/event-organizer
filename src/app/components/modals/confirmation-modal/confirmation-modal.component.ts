import {Order} from '@/models/orders';
import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {OrdersService} from '@services/orders.service';
import {ToastrService} from 'ngx-toastr';
import {take} from 'rxjs';

interface Status {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
    statusList: Status[] = [
        {value: 'PEMBAYARAN DITERIMA', viewValue: 'PEMBAYARAN DITERIMA'},
        {value: 'PEMBAYARAN DITOLAK', viewValue: 'PEMBAYARAN DITOLAK'}
    ];

    orderForm!: FormGroup;
    isSubmitting = false;

    constructor(
        public dialogRef: MatDialogRef<ConfirmationModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {id: string},
        private fb: FormBuilder,
        private router: Router,
        private ordersService: OrdersService,
        private cdRef: ChangeDetectorRef,
        private toastr: ToastrService
    ) {
        this.orderForm = this.fb.group({
            status: ['', Validators.required],
            komentar: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.isSubmitting) return; // Prevent multiple submissions

        this.isSubmitting = true; // Set flag to true to indicate submission is in progress

        if (this.orderForm.valid) {
            this.ordersService
                .getOrderById(this.data.id)
                .pipe(take(1)) // Automatically unsubscribe after receiving the first value
                .subscribe(
                    (existingOrder) => {
                        const updatedOrder =
                            this.prepareUpdatedOrder(existingOrder);
                        this.updateOrder(updatedOrder);
                    },
                    (error) => {
                        console.error('Failed to fetch order', error);
                        this.isSubmitting = false; // Reset flag if there's an error
                    }
                );
        } else {
            console.log('Form not valid');
            this.isSubmitting = false; // Reset flag if form is invalid
        }
    }

    private prepareUpdatedOrder(existingOrder: any): any {
        return {
            ...existingOrder,
            status: this.orderForm.get('status')?.value,
            komentar: this.orderForm.get('komentar')?.value
        };
    }

    private updateOrder(updatedOrder: any): void {
        this.ordersService
            .updateOrder(this.data.id, updatedOrder)
            .then(() => {
                console.log('Order updated successfully');
                this.orderForm.reset();
                this.isSubmitting = false; // Reset flag after successful update
                this.sendWhatsAppMessage(updatedOrder); // Send WhatsApp message
                this.onClose(); // Close dialog after successful update
            })
            .catch((error) => {
                console.error('Failed to update order', error);
                this.isSubmitting = false; // Reset flag if there's an error
            });
    }

    private sendWhatsAppMessage(order: any): void {
        const phoneNumber = order.phoneNumber; // Replace with the phone number in international format without the '+'
        if (phoneNumber != null || phoneNumber == '') {
            const message = `Order ID: ${order.id}\nStatus: ${order.status}\nComment: ${order.komentar}`;
            const encodedMessage = encodeURIComponent(message);
            const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            console.log('whatsapp url', url);

            window.open(url, '_blank');
        } else {
            this.toastr.error('Phone Number Not Provided');
        }
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
