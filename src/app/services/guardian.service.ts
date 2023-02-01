import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.auth.getUser()) {
      return true;
    }
    else {
      this.router.navigate(['/login']).then();
      return false;
    }
  }
}
