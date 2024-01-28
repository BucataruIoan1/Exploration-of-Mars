import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isGameStarted: boolean = false;

  constructor(public gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.gameService.isGameStarted$.subscribe((isGameStarted: boolean) => {
      this.isGameStarted = isGameStarted;
    });
  }

  startGame(): void {
    this.gameService.startGame();
    this.router.navigate(['/choose-explorer']);
  }
}
