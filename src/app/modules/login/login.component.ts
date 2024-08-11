import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    public loginForm: UntypedFormGroup;
    public registerForm: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;
    public isRightPanelActive: boolean = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.loginForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, Validators.required),
            password: new UntypedFormControl(null, Validators.required)
        });

        this.registerForm = new UntypedFormGroup({
            displayName: new UntypedFormControl(null, Validators.required),
            email: new UntypedFormControl(null, Validators.required),
            password: new UntypedFormControl(null, Validators.required),
            phoneNumber: new UntypedFormControl(null, Validators.required)
        });
    }

    async loginByAuth() {
        if (this.loginForm.valid) {
            this.isAuthLoading = true;
            await this.appService.loginWithEmail(
                this.loginForm.value.email,
                this.loginForm.value.password
            );

            this.isAuthLoading = false;
        } else {
            this.toastr.error('Form is not valid!');
        }
    }

    async loginByGoogle() {
        this.isGoogleLoading = true;
        await this.appService.signInByGoogle();
        this.isGoogleLoading = false;
    }

    async registerByAuth() {
        if (this.registerForm.valid) {
            this.isAuthLoading = true;
            await this.appService.registerWithEmail(
                this.registerForm.value.email,
                this.registerForm.value.password,
                this.registerForm.value.displayName,
                this.registerForm.value.phoneNumber
            );
            this.isAuthLoading = false;
        } else {
            this.toastr.error('Form is not valid!');
        }
    }

    async registerByGoogle() {
        this.isGoogleLoading = true;
        await this.appService.signInByGoogle();
        this.isGoogleLoading = false;
    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }

    onSignUp() {
        this.isRightPanelActive = true;
    }

    onSignIn() {
        this.isRightPanelActive = false;
    }
}
