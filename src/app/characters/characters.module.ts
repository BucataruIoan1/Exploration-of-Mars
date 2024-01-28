import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ExplorerComponent } from "./explorer/explorer.component";
import { CharactersComponent } from "./characters.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorComponent } from './doctor/doctor.component';
import { EngineerComponent } from './engineer/engineer.component';
import { MatIconModule } from '@angular/material/icon';

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
    ReactiveFormsModule,
    FormsModule,
    MatIconModule
  ],
  exports: [CharactersComponent]
})
export class CharactersModule {}
