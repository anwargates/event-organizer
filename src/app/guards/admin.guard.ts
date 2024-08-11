import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppService } from '@services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
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

async getProfile() {
    if (this.appService.role == "ADMIN") {
        return true;
    }

    console.log("role",this.appService.role);

    try {
        await this.appService.getRole();
        console.log("success get role");
        return this.appService.role == "ADMIN"
    } catch (error) {
        console.log("error get role");
        return false;
    }
}
};
