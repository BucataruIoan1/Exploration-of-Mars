import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }
}
