import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public isGameStartedSource = new BehaviorSubject<boolean>(false);
  isGameStarted$ = this.isGameStartedSource.asObservable();

  constructor() { }

  startGame(): void {
    this.isGameStartedSource.next(true);
  }

  stopGame(): void {
    this.isGameStartedSource.next(false);
  }
}
