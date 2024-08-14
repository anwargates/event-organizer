import {Component, HostListener, OnInit} from '@angular/core';
import {AppService} from '@services/app.service';
import {User} from 'firebase/auth';

@Component({
    selector: 'app-home-header',
    templateUrl: './home-header.component.html',
    styleUrl: './home-header.component.scss'
})
export class HomeHeaderComponent implements OnInit {
    isMenuOpen = false;

    constructor(public appService: AppService) {}

    ngOnInit(): void {
        console.log('user status', this.appService.user);
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    // Close the menu when a scroll-to-section link is clicked
    onLinkClick() {
        if (window.innerWidth < 991) {
            this.isMenuOpen = false;
        }
    }

    // Listen for window resize events
    @HostListener('window:resize', [])
    onResize() {
        if (window.innerWidth >= 991 && this.isMenuOpen) {
            this.isMenuOpen = false;
        }
    }

    scrollToSection(event: Event, targetId: string) {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            this.onLinkClick(); // Close the menu if needed
        }
    }
}
