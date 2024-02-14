import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private isGameStartedSource = new BehaviorSubject<boolean>(false);
  isGameStarted$ = this.isGameStartedSource.asObservable();
  private visitedGamePage: boolean = false;

  constructor() { }

  startGame(): void {
    this.isGameStartedSource.next(true);
  }

  stopGame(): void {
    this.isGameStartedSource.next(false);
  }

  setVisitedGamePage(value: boolean): void {
    this.visitedGamePage = value;
  }

  hasVisitedGamePage(): boolean {
    return this.visitedGamePage;
  }
}
