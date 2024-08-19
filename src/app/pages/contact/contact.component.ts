import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent {
    contactForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private snackBar: MatSnackBar
    ) {
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            subject: [''],
            message: ['', Validators.required]
        });
    }
    onSubmit() {
        console.log('onSubmitClicked');

        if (this.contactForm.valid) {
            const formData = this.contactForm.value;

            // Example: Sending data to your email service
            // this.http
            //     .post('https://example.com/api/send-email', formData)
            //     .subscribe({
            //         next: () => {
            //             this.snackBar.open(
            //                 'Message sent successfully!',
            //                 'Close',
            //                 {
            //                     duration: 3000
            //                 }
            //             );
            //             this.contactForm.reset();
            //         },
            //         error: (err) => {
            //             this.snackBar.open(
            //                 'Failed to send message. Try again later.',
            //                 'Close',
            //                 {
            //                     duration: 3000
            //                 }
            //             );
            //             console.error('Error sending email', err);
            //         }
            //     });

            // Example: Sending a WhatsApp message using a WhatsApp API
            const whatsappMessage = `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`;
            window.open(
                `https://api.whatsapp.com/send?phone=6285883673715&text=${encodeURIComponent(whatsappMessage)}`,
                '_blank'
            );
        } else {
            this.snackBar.open('Message sent successfully!', 'Close', {
                duration: 3000
            });
        }
    }
}
