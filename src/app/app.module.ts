import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CharactersModule } from './characters/characters.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { GameService } from './services/game.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameComponent } from './game/game.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthGuard } from './auth/auth-guard.service';
import { ColonyDiscoveredDialogComponent } from './dialog/colony-discovered-dialog/colony-discovered-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DangerDialogComponent } from './dialog/danger-dialog/danger-dialog.component';
import { GameOverDialogComponent } from './dialog/game-over-dialog/game-over-dialog.component';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AboutGameComponent } from './about-game/about-game.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GameComponent,
    ColonyDiscoveredDialogComponent,
    DangerDialogComponent,
    GameOverDialogComponent,
    AboutGameComponent,
  ],
  imports: [
    BrowserModule,
    CharactersModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule
  ],
  providers: [GameService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
