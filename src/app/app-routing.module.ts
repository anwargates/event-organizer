import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import {OrdersComponent} from '@pages/orders/orders/orders.component';
import {OrderFormComponent} from '@pages/order-form/order-form.component';
import {HomeComponent} from '@modules/home/home.component';
import { LandingComponent } from '@pages/landing/landing.component';
import { ProductsComponent } from '@pages/products/products.component';
import { CheckoutComponent } from '@pages/checkout/checkout.component';
import { PaymentComponent } from '@pages/payment/payment.component';
import { ProductsTableComponent } from '@pages/products-table/products-table.component';
import { ProductsFormComponent } from '@pages/products-form/products-form.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: LandingComponent
            },
            {
                path: 'products',
                component: ProductsComponent
            },
            {
                path: 'checkout',
                canActivate: [AuthGuard],
                component: CheckoutComponent
            },
            {
                path: 'payment',
                canActivate: [AuthGuard],
                component: PaymentComponent
            }
        ]
    },
    {
        path: 'dashboard',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'orders',
                component: OrdersComponent
            },
            {
                path: 'add',
                component: OrderFormComponent
            },
            {
                path: 'products',
                component: ProductsTableComponent
            },
            {
                path: 'products/edit',
                component: ProductsFormComponent
            },
            {
                path: '',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: 'login'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
