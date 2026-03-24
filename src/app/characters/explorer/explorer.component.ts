import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CharactersService } from 'src/app/services/characters.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements AfterViewInit {
  explorerForm: FormGroup;

  @ViewChild('nameInput') nameInput?: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private charactersService: CharactersService,
    private gameService: GameService,
  ) {
    this.explorerForm = this.fb.group({
      explorerName: ['', [Validators.required, this.customNameValidator]]
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const el = this.nameInput?.nativeElement;
      if (!el) return;
      el.focus();
      const len = el.value?.length ?? 0;
      el.setSelectionRange(len, len);
    }, 0);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onEnterKeyPress();
    }
  }

  onEnterKeyPress() {
    if (!this.canProceed) return;
    const inputVal = `${this.explorerForm.get('explorerName')?.value ?? ''}`.trim();
    this.charactersService.setNameAndCharacter('explorer', inputVal, '👨‍🚀');
    this.router.navigate(['choose-doctor']);
  }

  customNameValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = `${control.value ?? ''}`;
    const trimmed = value.trim();

    if (trimmed.length === 0) {
      return { invalidName: true };
    }

    return null;
  };

  get canProceed(): boolean {
    const value = `${this.explorerForm.get('explorerName')?.value ?? ''}`;
    return value.trim().length > 0;
  }

  moveToMainPage(): void {
    this.gameService.stopGame();
    this.router.navigate(['/']);
  }

  moveToDoctorStep() {
    if (!this.canProceed) return;
    const inputVal = `${this.explorerForm.get('explorerName')?.value ?? ''}`.trim();
    this.charactersService.setNameAndCharacter('explorer', inputVal, '👨‍🚀');
    this.router.navigate(['choose-doctor']);
  }
}
