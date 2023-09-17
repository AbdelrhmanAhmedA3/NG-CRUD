import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import { catchError, map, of } from 'rxjs';
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // const authService = inject(AuthenticationService);
  const router = inject(Router);
  if (!localStorage.getItem('token')) {
    return router.navigate(['login'])
  }


  return true;
};
