import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-about-game',
  templateUrl: './about-game.component.html',
  styleUrls: ['./about-game.component.scss'],
})
export class AboutGameComponent {
  constructor(private router: Router, private gameService: GameService) {}

  moveToMainPage(): void {
    this.gameService.stopGame();
    this.router.navigate(['/']);
  }
}
