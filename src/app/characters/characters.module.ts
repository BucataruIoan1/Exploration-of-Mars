import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ExplorerComponent } from "./explorer/explorer.component";
import { CharactersComponent } from "./characters.component";
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorComponent } from './doctor/doctor.component';
import { EngineerComponent } from './engineer/engineer.component';

@NgModule({
  declarations: [
    ExplorerComponent,
    CharactersComponent,
    DoctorComponent,
    EngineerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [CharactersComponent]
})
export class CharactersModule {}
