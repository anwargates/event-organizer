import {Injectable} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '@services/app.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private appService: AppService
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.getProfile();
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.canActivate(next, state);
    }

    async getProfile(): Promise<boolean> {
        console.log('current profile is:', this.appService.user);

        if (this.appService.user) {
            console.log('user exists');
            return true;
        }

        try {
            console.log('no user exists, fetching profile');
            await this.appService.getProfile();

            if (this.appService.user) {
                console.log('success get profile:', this.appService.user);
                return true;
            } else {
                console.log('no user after fetching profile');
                this.router.navigate(['/login']);
                return false;
            }
        } catch (error) {
            console.log('error get profile', error);
            this.router.navigate(['/login']);
            return false;
        }
    }
}
