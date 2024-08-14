import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';

import {CommonModule, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {SidebarSearchComponent} from './components/sidebar-search/sidebar-search.component';
import {NgxGoogleAnalyticsModule} from 'ngx-google-analytics';
import {environment} from 'environments/environment';
import {ActivityTabComponent} from './pages/profile/activity-tab/activity-tab.component';
import {TimelineTabComponent} from './pages/profile/timeline-tab/timeline-tab.component';
import {SettingsTabComponent} from './pages/profile/settings-tab/settings-tab.component';
import {PostComponent} from './pages/profile/post/post.component';
import {InfoBoxComponent} from './components/info-box/info-box.component';
import {SmallBoxComponent} from './components/small-box/small-box.component';
import {ContentHeaderComponent} from './components/content-header/content-header.component';
import {LoadingComponent} from './components/loading/loading.component';
import {OverlayLoadingComponent} from './components/overlay-loading/overlay-loading.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {OrdersComponent} from './pages/orders/orders/orders.component';
import {TableOrdersComponent} from './components/table/table-orders/table-orders.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {OrderFormComponent} from './pages/order-form/order-form.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {
    MatMomentDateModule,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS
} from '@angular/material-moment-adapter';
import {
    MatNativeDateModule,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE
} from '@angular/material/core';
import {HomeComponent} from './modules/home/home.component';
import {LandingComponent} from './pages/landing/landing.component';
import {HomeHeaderComponent} from '@modules/home/header/home-header.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {ProductsComponent} from './pages/products/products.component';
import {CheckoutComponent} from './pages/checkout/checkout.component';
import {PaymentComponent} from './pages/payment/payment.component';
import {StorageModule} from '@angular/fire/storage';
import {OrderProofDialogComponentComponent} from './components/modals/order-proof-dialog-component/order-proof-dialog-component.component';
import {TableProductsComponent} from './components/table/table-products/table-products.component';
import {ProductsTableComponent} from './pages/products-table/products-table.component';
import {ProductsFormComponent} from './pages/products-form/products-form.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PaymentConfirmComponent} from './pages/payment-confirm/payment-confirm.component';
import {ConfirmationFormComponent} from './pages/confirmation-form/confirmation-form.component';
import {ConfirmationModalComponent} from './components/modals/confirmation-modal/confirmation-modal.component';
import {DeleteConfirmationDialogComponent} from './components/modals/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AngularFireModule} from '@angular/fire/compat';
import {EditProductsDialogComponent} from './components/modals/edit-products-dialog/edit-products-dialog.component';
import {AddProductsDialogComponent} from './components/modals/add-products-dialog/add-products-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {HomeFooterComponent} from '@modules/home/home-footer/home-footer.component';

registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        ControlSidebarComponent,
        SidebarSearchComponent,
        ActivityTabComponent,
        TimelineTabComponent,
        SettingsTabComponent,
        PostComponent,
        InfoBoxComponent,
        SmallBoxComponent,
        ContentHeaderComponent,
        LoadingComponent,
        OverlayLoadingComponent,
        OrdersComponent,
        TableOrdersComponent,
        OrderFormComponent,
        HomeComponent,
        LandingComponent,
        HomeHeaderComponent,
        HomeFooterComponent,
        ProductsComponent,
        CheckoutComponent,
        PaymentComponent,
        OrderProofDialogComponentComponent,
        TableProductsComponent,
        ProductsTableComponent,
        ProductsFormComponent,
        PaymentConfirmComponent,
        ConfirmationFormComponent,
        ConfirmationModalComponent,
        DeleteConfirmationDialogComponent,
        EditProductsDialogComponent,
        AddProductsDialogComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        ProfabricComponentsModule,
        CommonModule,
        BrowserModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        NgxGoogleAnalyticsModule.forRoot(environment.GA_ID),
        FontAwesomeModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        // MatNativeDateModule,
        MatMomentDateModule,
        CarouselModule,
        StorageModule,
        NgbModule,
        MatDialogModule,
        AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
        MatExpansionModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideFirebaseApp(() =>
            initializeApp({
                projectId: 'event-organizer-2784f',
                appId: '1:425582421521:web:9a0b44c9a3ad7d3a6f33b0',
                storageBucket: 'event-organizer-2784f.appspot.com',
                apiKey: 'AIzaSyCnt82QVdGjpjgvCq8sQ-OH9jnk_8nnHP0',
                authDomain: 'event-organizer-2784f.firebaseapp.com',
                messagingSenderId: '425582421521'
            })
        ),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideNativeDateAdapter(),
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'DD/MM/YYYY' // Format for parsing input from user
                },
                display: {
                    dateInput: 'DD/MM/YYYY', // Format for displaying date in the input field
                    monthYearLabel: 'MMM YYYY', // Format for month/year labels (e.g., Jan 2024)
                    dateA11yLabel: 'DD/MM/YYYY', // Format for screen readers
                    monthYearA11yLabel: 'MMMM YYYY' // Format for month/year labels (e.g., January 2024) for screen readers
                }
            }
        },
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, // Set locale to GB for DD/MM/YYYY format
        {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}} // Optional: Use UTC dates
    ]
})
export class AppModule {}
