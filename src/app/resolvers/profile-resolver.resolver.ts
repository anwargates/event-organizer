import {AppService} from '@services/app.service';
import {Resolve} from '@angular/router';

export class profileResolverResolver implements Resolve<any> {
    constructor(private appService: AppService) {}

    resolve(): Promise<any> {
        return this.appService.getProfile();
    }
}
