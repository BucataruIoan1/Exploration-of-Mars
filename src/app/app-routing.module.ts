import { inject, NgModule } from '@angular/core';
import { CanDeactivateFn, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CharactersComponent } from './characters/characters.component';
import { DoctorComponent } from './characters/doctor/doctor.component';
import { EngineerComponent } from './characters/engineer/engineer.component';
import { GameComponent } from './game/game.component';
import { HowToPlayComponent } from './how-to-play/how-to-play.component';
import { AuthGuard } from './auth/auth-guard.service';
import { GameService } from './services/game.service';

const canDeactivateGame: CanDeactivateFn<GameComponent> = () => {
  const gameService = inject(GameService);
  if (gameService.canLeaveGame()) {
    gameService.setAllowLeaveGame(false);
    return true;
  }
  return false;
};

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full'
  },
  {
    path: 'how-to-play',
    component: HowToPlayComponent,
  },
  {
    path: 'choose-explorer',
    component: CharactersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'choose-doctor',
    component: DoctorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'choose-engineer',
    component: EngineerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'game',
    component: GameComponent,
    canActivate: [AuthGuard],
    canDeactivate: [canDeactivateGame],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
  ]
})
export class AppRoutingModule {}
