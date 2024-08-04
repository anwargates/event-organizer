import {AfterViewInit, Component} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {$} from 'protractor';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss'
})
export class LandingComponent implements AfterViewInit {
    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            740: {
                items: 3
            },
            940: {
                items: 4
            }
        },
        nav: true
    };
    ngAfterViewInit(): void {
        // this.initializeOwlCarousel();
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
}
