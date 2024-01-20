import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CharactersComponent } from './characters/characters.component';
import { DoctorComponent } from './characters/doctor/doctor.component';
import { EngineerComponent } from './characters/engineer/engineer.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'choose-explorer',
    component: CharactersComponent
  },
  {
    path: 'choose-doctor',
    component: DoctorComponent
  },
  {
    path: 'choose-engineer',
    component: EngineerComponent
  },
  {
    path: 'game',
    component: GameComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
