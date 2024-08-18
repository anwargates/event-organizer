import {HttpClient} from '@angular/common/http';
import {AfterViewInit, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {MatSnackBar} from '@angular/material/snack-bar';
import {$} from 'protractor';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss'
})
export class LandingComponent implements AfterViewInit {
    customOptions: OwlOptions = {
        loop: true,
        items: 1, // Try starting with a fixed number of items
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['', ''],
        nav: true
    };

    ngAfterViewInit(): void {
        // this.initializeOwlCarousel();
        // $('.owl-carousel').owlCarousel();
    }

    // initializeOwlCarousel(): void {
    //     ($('.owl-carousel') as any).owlCarousel({
    //         loop: true,
    //         margin: 10,
    //         nav: true,
    //         responsive: {
    //             0: {items: 1},
    //             600: {items: 1},
    //             1000: {items: 1}
    //         }
    //     });
    // }

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
