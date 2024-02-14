import { Injectable } from '@angular/core';
import { Character } from '../interfaces/explorer.interface';

@Injectable({
  providedIn: 'root'
})
export class GameUtilsService {

  constructor() { }

  getCurrentCharacterPosition(currentPlayer: string | undefined, explorer: Character | undefined, doctor: Character | undefined, engineer: Character | undefined): { row: number; col: number } {
    switch (currentPlayer) {
      case 'explorer':
        return explorer?.position || { row: -1, col: -1 };
      case 'doctor':
        return doctor?.position || { row: -1, col: -1 };
      case 'engineer':
        return engineer?.position || { row: -1, col: -1 };
      default:
        return { row: -1, col: -1 };
    }
  }

  getCurrentCharacter(currentPlayer: string | undefined, explorer: Character | undefined, doctor: Character | undefined, engineer: Character | undefined): Character | undefined {
    switch (currentPlayer) {
      case 'explorer':
        return explorer;
      case 'doctor':
        return doctor;
      case 'engineer':
        return engineer;
      default:
        return undefined;
    }
  }

  getNextPlayer(currentPlayer: any): any {
    switch (currentPlayer) {
      case 'explorer':
        return 'doctor';
      case 'doctor':
        return 'engineer';
      case 'engineer':
        return 'explorer';
      default:
        return 'explorer';
    }
  }

  getAvailableOptions(currentPlayer: string | undefined, characters: Character[], isColonyDiscovered: boolean, areCharactersOnSamePosition: Function): string[] {
    const explorer = characters.find((character: any) => character.type === 'explorer');
    const doctor = characters.find((character: any) => character.type === 'doctor');
    const engineer = characters.find((character: any) => character.type === 'engineer');

    return !isColonyDiscovered ?
      (currentPlayer === 'explorer' ? ['Explore'] :
        (currentPlayer === 'doctor' ?
          (!areCharactersOnSamePosition(doctor, explorer) && !areCharactersOnSamePosition(doctor, engineer) ? ['Explore', 'Stay'] : ['Explore', 'Stay', 'Heal']) :
          (currentPlayer === 'engineer' ?
            (!areCharactersOnSamePosition(engineer, explorer) && !areCharactersOnSamePosition(engineer, doctor) ? ['Explore', 'Stay'] : ['Explore', 'Stay', 'Repair']) : [])))
      : [];
  }

  isLastCharacter(characters: Character[]): boolean {
    const charactersAlive = characters.filter(
      (character: any) => character.hp > 0
    );
    return charactersAlive.length === 1;
  }

  isLastCharacterAndExplorable(characters: Character[], row: number, col: number): boolean {
    const lastCharacter = characters.find(
      (character: Character) => !this.isCharacterDead(character)
    );
    if (lastCharacter) {
      const lastCharacterPosition = lastCharacter.position;
      return !!lastCharacterPosition &&
        ((Math.abs(lastCharacterPosition.row - row) === 1 &&
          lastCharacterPosition.col === col) ||
          (Math.abs(lastCharacterPosition.col - col) === 1 &&
            lastCharacterPosition.row === row));
    }
    return false;
}

  isCharacterDead(character: Character | undefined): boolean {
    return !!character && character.hp !== undefined && character.hp <= 0;
  }

  areAllCharactersDead(characters: Character[]): boolean {
    return characters.every((character: Character) => character.hp === 0);
  }

  atLeastOneCharacterAlive(characters: Character[]): boolean {
    return characters.some((character) => character.hp > 0);
  }

  areCharactersOnSamePosition(character1: Character, character2: Character): boolean {
    return (
      character1.position?.row === character2.position?.row &&
      character1.position?.col === character2.position?.col
    );
  }

  isCurrentCharacterPosition(currentPlayer: string | undefined, row: number, col: number, explorer: Character | undefined, doctor: Character | undefined, engineer: Character | undefined): boolean {
    switch (currentPlayer) {
      case 'explorer':
        return !!explorer && explorer.position?.row === row && explorer.position?.col === col;
      case 'doctor':
        return !!doctor && doctor.position?.row === row && doctor.position?.col === col;
      case 'engineer':
        return !!engineer && engineer.position?.row === row && engineer.position?.col === col;
      default:
        return false;
    }
  }

}
