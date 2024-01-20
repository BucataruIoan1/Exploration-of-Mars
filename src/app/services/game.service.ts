import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  isGameStarted: boolean = false;

  starGame(): void {
    this.isGameStarted = !this.isGameStarted
  }
}
