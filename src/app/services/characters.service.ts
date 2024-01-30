import { Injectable } from '@angular/core';
import { Character } from '../interfaces/explorer.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private characters: { [key: string]: Character } = {};
  private currentPlayer: string | undefined;

  private explorerSubject: BehaviorSubject<Character | undefined> = new BehaviorSubject<Character | undefined>(undefined);
  private doctorSubject: BehaviorSubject<Character | undefined> = new BehaviorSubject<Character | undefined>(undefined);
  private engineerSubject: BehaviorSubject<Character | undefined> = new BehaviorSubject<Character | undefined>(undefined);

  explorer$ = this.explorerSubject.asObservable();
  doctor$ = this.doctorSubject.asObservable();
  engineer$ = this.engineerSubject.asObservable();

  constructor(private router: Router) {
    this.loadGameState();
  }

  setCurrentPlayer(player: string): void {
    this.currentPlayer = player;
  }

  getCurrentPlayer(): string | undefined {
    return this.currentPlayer;
  }

  getCharacter(type: string): Character | undefined {
    return this.characters[type];
  }

  setCharacter(type: string, character: Character): void {
    this.characters[type] = character;
    this.saveGameState();
    switch (type) {
      case 'explorer':
        this.explorerSubject.next(character);
        break;
      case 'doctor':
        this.doctorSubject.next(character);
        break;
      case 'engineer':
        this.engineerSubject.next(character);
        break;
    }
  }

  clearCharacters(): void {
    this.characters = {};
    this.currentPlayer = undefined;
    this.explorerSubject.next(undefined);
    this.doctorSubject.next(undefined);
    this.engineerSubject.next(undefined);
    this.saveGameState();
  }

  setNameAndCharacter(type: string, name: string, avatar: string): void {
    const character: Character = {
      name,
      type,
      avatar,
      canExplore: false,
      canHeal: type === 'doctor',
      canRepairArmour: type === 'engineer',
      hp: type === 'doctor' ? 100 : (type === 'engineer' ? 25 : 100),
      armour: type === 'doctor' ? 25 : (type === 'engineer' ? 100 : 100)
    };

    this.setCharacter(type, character);
  }

  getName(type: string): string {
    return this.characters[type]?.name || '';
  }

  getExplorer(): Character | undefined {
    return this.characters['explorer'];
  }

  getDoctor(): Character | undefined {
    return this.characters['doctor'];
  }

  getEngineer(): Character | undefined {
    return this.characters['engineer'];
  }

  getExplorerObservable(): Observable<Character | undefined> {
    return this.explorerSubject.asObservable();
  }

  getDoctorObservable(): Observable<Character | undefined> {
    return this.doctorSubject.asObservable();
  }

  getEngineerObservable(): Observable<Character | undefined> {
    return this.engineerSubject.asObservable();
  }

  private saveGameState(): void {
    localStorage.setItem('gameState', JSON.stringify({ characters: this.characters, currentPlayer: this.currentPlayer }));
  }

  private loadGameState(): void {
    const gameStateString = localStorage.getItem('gameState');

    if (gameStateString) {
      const gameState = JSON.parse(gameStateString) as { characters: any, currentPlayer: string | undefined };

      this.characters = gameState.characters;
      this.currentPlayer = gameState.currentPlayer;

      this.refreshSubjects();
    }
  }

  private refreshSubjects(): void {
    this.explorerSubject.next(this.characters['explorer']);
    this.doctorSubject.next(this.characters['doctor']);
    this.engineerSubject.next(this.characters['engineer']);
  }

}
