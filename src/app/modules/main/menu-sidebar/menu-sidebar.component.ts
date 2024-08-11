import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {User} from 'firebase/auth';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    // public user?: User;
    public menu = MENU;

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {
        this.appService.getRole();
        // this.user = this.appService.user;
    }

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.filterMenuByRole();
    }

    private filterMenuByRole() {
        if (this.appService.user && this.appService.role === 'ADMIN') {
            this.menu = MENU; // Full menu for admins
        } else {
            // Exclude Products menu for non-admin users
            this.menu = MENU.filter((item) => item.name !== 'Products');
        }
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/dashboard']
    },
    {
        name: 'Orders',
        iconClasses: 'fas fa-cart-shopping',
        path: ['/dashboard/orders']
    },
    {
        name: 'Products',
        iconClasses: 'fas fa-calendar',
        path: ['/dashboard/products']
    }
    // {
    //     name: 'Main Menu',
    //     iconClasses: 'fas fa-folder',
    //     children: [
    //         {
    //             name: 'Sub Menu',
    //             iconClasses: 'far fa-address-book',
    //             path: ['/dashboard/sub-menu-1']
    //         },
    //         {
    //             name: 'Blank',
    //             iconClasses: 'fas fa-file',
    //             path: ['/dashboard/sub-menu-2']
    //         }
    //     ]
    // }
];
