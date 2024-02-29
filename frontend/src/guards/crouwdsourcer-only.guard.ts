import { Injectable, ɵgetUnknownElementStrictMode } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CrouwdsourcerOnlyGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {

        if (this.authService.isLoggedIn()) {
            return true;
        }
      
          //  let questionnaire=route.url;
          if(state.url.split('/')[3]!='' && state.url.split('/')[3]!=undefined && !this.authService.isLoggedIn())
          {
            return  this.router.navigate(['/login'], { queryParams: { qid: state.url.split('/')[3] }});
          }
          else
            return this.router.navigate(['/login']);
            
        
    }
}
