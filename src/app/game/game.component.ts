import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../services/characters.service';
import { Character } from '../interfaces/explorer.interface';
import { BoardBox } from '../enum/board-box.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  explorer!: Character | undefined;
  doctor!: Character | undefined;
  engineer!: Character | undefined;
  characters: any;
  board: BoardBox[][] = [];
  currentPlayer: string | undefined;

  constructor(private charactersService: CharactersService) {}

  ngOnInit(): void {
    this.createCharacters();
    this.initializeBoard();
    this.currentPlayer = 'explorer';
  }

  createCharacters(): void {
    this.explorer = this.charactersService.getExplorer();
    this.doctor = this.charactersService.getDoctor();
    this.engineer = this.charactersService.getEngineer();
    this.characters = [this.explorer, this.doctor, this.engineer]
  }

  initializeBoard(): void {
    this.board = Array.from({ length: 5 }, () => Array(5).fill(BoardBox.Unexplored));
  
    if (this.explorer && this.doctor && this.engineer) {
      this.board[2][2] = BoardBox.Characters;
      this.characterPositionUpdate(this.explorer, 2, 2);
      this.characterPositionUpdate(this.doctor, 2, 2);
      this.characterPositionUpdate(this.engineer, 2, 2);
    }
  }

  onBoxClick(row: number, col: number): void {
    if (!this.currentPlayer) {
      return;
    }
  
    const currentPlayerCharacter = this.currentPlayer === 'explorer'
      ? this.explorer
      : this.currentPlayer === 'doctor'
        ? this.doctor
        : this.engineer;
  
    const currentPlayerPosition = this.getCurrentCharacterPosition();
    const isAdjacentPosition = Math.abs(currentPlayerPosition.row - row) === 1 && currentPlayerPosition.col === col
      || Math.abs(currentPlayerPosition.col - col) === 1 && currentPlayerPosition.row === row;
  
    const isUnexploredOrExplored = this.board[row][col] === BoardBox.Unexplored || this.board[row][col] === BoardBox.Explored;
  
    if (isUnexploredOrExplored && isAdjacentPosition) {
      this.moveCharacter(currentPlayerCharacter, row, col);
      this.board[row][col] = BoardBox.Explored;
      this.changePlayerTurn();
    } else if (this.board[row][col] === BoardBox.Explored && isAdjacentPosition) {
      this.moveCharacter(currentPlayerCharacter, row, col);
      this.changePlayerTurn();
    }
  }
  
  isAdjacentPosition(row: number, col: number): boolean {
    const currentPlayerPosition = this.getCurrentCharacterPosition();

    return (
      (Math.abs(currentPlayerPosition.row - row) === 1 && currentPlayerPosition.col === col) ||
      (Math.abs(currentPlayerPosition.col - col) === 1 && currentPlayerPosition.row === row)
    );
  }
  
  getCurrentCharacterPosition(): { row: number, col: number } {
    switch (this.currentPlayer) {
      case 'explorer':
        return this.explorer?.position || { row: -1, col: -1 };
      case 'doctor':
        return this.doctor?.position || { row: -1, col: -1 };
      case 'engineer':
        return this.engineer?.position || { row: -1, col: -1 };
      default:
        return { row: -1, col: -1 };
    }
  }
  
  moveCharacter(character: Character | undefined, row: number, col: number): void {
    if (character) {
      this.board[character.position?.row || 0][character.position?.col || 0] = BoardBox.Explored;
      this.characterPositionUpdate(character, row, col);
      this.board[row][col] = BoardBox.Explored;
    }
  }
  
  characterPositionUpdate(character: Character, row: number, col: number): void {
    character.position = { row, col };
  }

  isCurrentCharacterPosition(row: number, col: number): boolean {
    return (
      (this.currentPlayer === 'explorer' && this.explorer?.position?.row === row && this.explorer?.position?.col === col) ||
      (this.currentPlayer === 'doctor' && this.doctor?.position?.row === row && this.doctor?.position?.col === col) ||
      (this.currentPlayer === 'engineer' && this.engineer?.position?.row === row && this.engineer?.position?.col === col)
    );
  }
  
  changePlayerTurn(): void {
    switch (this.currentPlayer) {
      case 'explorer':
        this.currentPlayer = 'doctor';
        break;
      case 'doctor':
        this.currentPlayer = 'engineer';
        break;
      case 'engineer':
        this.currentPlayer = 'explorer';
        break;
    }
  }

}