import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutGameComponent } from './about-game.component';

describe('AboutGameComponent', () => {
  let component: AboutGameComponent;
  let fixture: ComponentFixture<AboutGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutGameComponent]
    });
    fixture = TestBed.createComponent(AboutGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
