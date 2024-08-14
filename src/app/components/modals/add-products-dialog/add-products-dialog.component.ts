import {Products} from '@/models/products';
import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ProductsService} from '@services/products.service';
import {ToastrService} from 'ngx-toastr';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {
    Storage,
    getDownloadURL,
    ref,
    uploadBytesResumable
} from '@angular/fire/storage';

interface Category {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-add-products-dialog',
    templateUrl: './add-products-dialog.component.html',
    styleUrl: './add-products-dialog.component.scss'
})
export class AddProductsDialogComponent {
    categoryList: Category[] = [
        {value: 'Wedding', viewValue: 'Wedding'},
        {value: 'Music Entertainment', viewValue: 'Music Entertainment'},
        {value: 'Meeting & Conference', viewValue: 'Meeting & Conference'}
    ];

    typeList: Category[] = [
        {value: 'wedding', viewValue: 'Wedding'},
        {value: 'music', viewValue: 'Music Entertainment'},
        {value: 'meeting', viewValue: 'Meeting & Conference'}
    ];

    productForm!: FormGroup;
    isSubmitting = false;
    imageUrl: string | ArrayBuffer | null = null;
    selectedFile: File | null = null;
    private storage = inject(Storage);

    constructor(
        public dialogRef: MatDialogRef<ConfirmationModalComponent>,
        // @Inject(MAT_DIALOG_DATA) public data: Products,
        private fb: FormBuilder,
        private router: Router,
        private productService: ProductsService,
        private cdRef: ChangeDetectorRef,
        private toastr: ToastrService
    ) {
        // console.log('Loaded form data', data);
        this.productForm = this.fb.group({
            title: ['', Validators.required],
            location: ['', Validators.required],
            duration: ['', Validators.required],
            maxGuests: ['', Validators.required],
            amenities: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required]
        });
    }

    onFileSelected(event: Event): void {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files[0]) {
            this.selectedFile = fileInput.files[0];

            const reader = new FileReader();
            reader.onload = () => {
                this.imageUrl = reader.result;
                this.cdRef.detectChanges();
            };
            reader.readAsDataURL(this.selectedFile);
        }
    }

    onSubmit(): void {
        if (this.isSubmitting) return;

        this.isSubmitting = true;

        if (this.productForm.valid) {
            const preparedProduct: Products = {
                title: this.productForm.value.title,
                details: {
                    location: this.productForm.value.location,
                    duration: this.productForm.value.duration,
                    maxGuests: this.productForm.value.maxGuests,
                    amenities: this.productForm.value.amenities
                        .split(',')
                        .map((a) => a.trim())
                },
                price: this.productForm.value.price,
                type: this.productForm.value.category,
                detailsUrl: '',
                imageUrl: '', // Placeholder, will update after upload
                category:
                    this.typeList.find(
                        (i) => i.viewValue === this.productForm.value.category
                    )?.viewValue || '',
                id: ''
            };

            if (this.selectedFile) {
                this.uploadImage(this.selectedFile)
                    .then((imageUrl) => {
                        preparedProduct.imageUrl = imageUrl;
                        this.saveProduct(preparedProduct);
                    })
                    .catch((error) => {
                        this.isSubmitting = false;
                        console.error('Failed to upload image:', error);
                        this.toastr.error('Failed to upload image');
                    });
            } else {
                this.saveProduct(preparedProduct);
            }
        } else {
            this.isSubmitting = false;
        }
    }

    async uploadImage(file: File): Promise<string> {
        const filePath = `productImage/${Date.now()}_${file.name}`;
        const fileRef = ref(this.storage, filePath);
        const uploadTask = uploadBytesResumable(fileRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                () => {},
                (error) => {
                    console.error('Upload failed:', error);
                    reject(error);
                },
                async () => {
                    try {
                        const downloadUrl = await getDownloadURL(fileRef);
                        console.log(`Download URL: ${downloadUrl}`);
                        resolve(downloadUrl);
                    } catch (error) {
                        console.error('Failed to get download URL:', error);
                        reject(error);
                    }
                }
            );
        });
    }

    saveProduct(product: Products): void {
        this.productService
            .createProduct(product)
            .then(() => {
                this.isSubmitting = false;
                console.log('Product added successfully');
                this.toastr.success('Product added successfully');
                this.onClose();
            })
            .catch((error) => {
                this.isSubmitting = false;
                console.log('Failed to add product', error);
                this.toastr.error('Failed to add product', error);
            });
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
