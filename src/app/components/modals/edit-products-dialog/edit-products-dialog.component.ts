import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {OrdersService} from '@services/orders.service';
import {ToastrService} from 'ngx-toastr';
import {take} from 'rxjs';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {Products} from '@/models/products';
import {ProductsService} from '@services/products.service';

@Component({
    selector: 'app-edit-products-dialog',
    templateUrl: './edit-products-dialog.component.html',
    styleUrl: './edit-products-dialog.component.scss'
})
export class EditProductsDialogComponent {
    productForm!: FormGroup;
    isSubmitting = false;

    constructor(
        public dialogRef: MatDialogRef<ConfirmationModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Products,
        private fb: FormBuilder,
        private router: Router,
        private productService: ProductsService,
        private cdRef: ChangeDetectorRef,
        private toastr: ToastrService
    ) {
        console.log('Loaded form data', data);
        this.productForm = this.fb.group({
            title: [data.title, Validators.required],
            location: [data.details.location, Validators.required],
            duration: [data.details.duration, Validators.required],
            maxGuests: [data.details.maxGuests, Validators.required],
            amenities: [data.details.amenities.join(', '), Validators.required],
            price: [data.price, Validators.required],
            info: [data.details.info, Validators.required]
        });
    }

    onSubmit(): void {
        if (this.isSubmitting) return; // Prevent multiple submissions

        this.isSubmitting = true; // Set flag to true to indicate submission is in progress

        if (this.productForm.valid) {
            const updatedProduct = {
                ...this.data,
                title: this.productForm.value.title,
                details: {
                    ...this.data.details,
                    info: this.productForm.value.info,
                    location: this.productForm.value.location,
                    duration: this.productForm.value.duration,
                    maxGuests: this.productForm.value.maxGuests,
                    amenities: this.productForm.value.amenities
                        .split(',')
                        .map((a) => a.trim())
                },
                price: this.productForm.value.price
            };
            this.productService
                .updateProducts(this.data.id, updatedProduct)
                .then(() => {
                    this.isSubmitting = false;
                    this.toastr.success('Product updated successfully');
                    this.onClose();
                })
                .catch((error) => {
                    this.isSubmitting = false;
                    console.error('Error updating product:', error);
                    this.toastr.error('Failed to update product');
                });
        } else {
            console.log('Form not valid');
            this.isSubmitting = false; // Reset flag if form is invalid
        }
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
