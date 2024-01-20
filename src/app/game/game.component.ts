import { Character } from '../interfaces/explorer.interface';
import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  explorer!: Character | undefined;
  doctor!: Character | undefined;
  engineer!: Character | undefined;
  constructor(private charactersService: CharactersService) {}

  ngOnInit(): void {
    this.createCharacters();
  }

  createCharacters(): void {
    this.explorer = this.charactersService.getExplorer();
    this.doctor = this.charactersService.getDoctor();
    this.engineer = this.charactersService.getEngineer();

    if (!this.explorer || !this.doctor || !this.engineer) {
      console.error('No characters created');
    }
  }


}
