import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CharactersComponent } from './characters/characters.component';
import { DoctorComponent } from './characters/doctor/doctor.component';
import { EngineerComponent } from './characters/engineer/engineer.component';
import { GameComponent } from './game/game.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full'
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
