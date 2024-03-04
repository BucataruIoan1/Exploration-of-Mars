import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MainComponent } from './main/main.component';
import { CharactersComponent } from './characters/characters.component';
import { DoctorComponent } from './characters/doctor/doctor.component';
import { EngineerComponent } from './characters/engineer/engineer.component';
import { GameComponent } from './game/game.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AboutGameComponent } from './about-game/about-game.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full'
  },
  {
    path: 'about-game',
    component: AboutGameComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [AuthGuard]
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
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
