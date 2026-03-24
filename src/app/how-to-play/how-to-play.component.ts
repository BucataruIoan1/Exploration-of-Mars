import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

type DangerKey = 'Storm Dust' | 'Radiation' | 'Aliens' | 'Cliffs' | 'Darth Vader';

@Component({
  selector: 'app-how-to-play',
  templateUrl: './how-to-play.component.html',
  styleUrls: ['./how-to-play.component.scss'],
})
export class HowToPlayComponent {
  dangers: { key: DangerKey; emoji: string; hp: number; armour: number }[] = [
    { key: 'Storm Dust', emoji: '🌪️', hp: -25, armour: -50 },
    { key: 'Radiation', emoji: '☢️', hp: 0, armour: -70 },
    { key: 'Aliens', emoji: '👽', hp: -30, armour: -30 },
    { key: 'Cliffs', emoji: '⛰️', hp: -90, armour: 0 },
    { key: 'Darth Vader', emoji: '⚔️', hp: -100, armour: -100 },
  ];

  constructor(private router: Router, private gameService: GameService) {}

  readyToPlay(): void {
    this.gameService.startGame();
    this.router.navigate(['/choose-explorer']);
  }
}
