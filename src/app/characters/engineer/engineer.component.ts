import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-engineer',
  templateUrl: './engineer.component.html',
  styleUrls: ['./engineer.component.scss']
})
export class EngineerComponent implements AfterViewInit {
  engineerForm: FormGroup;
  isLeftArrowDisabled = true;

  @ViewChild('nameInput') nameInput?: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private charactersService: CharactersService
  ) {
    this.engineerForm = this.fb.group({
      engineerName: ['', [Validators.required, this.customNameValidator]]
    });

    this.charactersService.getEngineerObservable().subscribe((engineer) => {
      if (engineer) {
        this.isLeftArrowDisabled = false;
      }
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
    const inputVal = `${this.engineerForm.get('engineerName')?.value ?? ''}`.trim();
    this.charactersService.setNameAndCharacter('engineer', inputVal, '👷');
    this.router.navigate(['game'], { replaceUrl: true });
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
    const value = `${this.engineerForm.get('engineerName')?.value ?? ''}`;
    return value.trim().length > 0;
  }

  moveToGame() {
    if (!this.canProceed) return;
    const inputVal = `${this.engineerForm.get('engineerName')?.value ?? ''}`.trim();
    this.charactersService.setNameAndCharacter('engineer', inputVal, '👷');
    this.router.navigate(['game'], { replaceUrl: true });
  }

  moveToDoctor() {
    this.router.navigate(['choose-doctor']);
  }
}
