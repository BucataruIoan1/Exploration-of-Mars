import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private gameService: GameService, private router: Router) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | boolean {

      return this.gameService.isGameStarted$.pipe(
        take(1),
        map(isGameStarted => {
          if (!isGameStarted) {
            this.router.navigate(['/']);
            return false;
          }
          return true;
        })
      );
    }
}