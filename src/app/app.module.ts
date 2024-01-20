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

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    CharactersModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
