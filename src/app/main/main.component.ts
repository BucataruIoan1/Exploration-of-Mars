import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public gameService: GameService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((urlSegments) => {
      if (urlSegments.length === 0) {
        this.gameService.isGameStarted = false;
      }
    });
  }

  startGame(): void {
    this.gameService.isGameStarted = true;
    this.router.navigate(['choose-explorer']);
  }
  
}
