import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerDialogComponent } from './danger-dialog.component';

describe('DarthVaderDialogComponent', () => {
  let component: DangerDialogComponent;
  let fixture: ComponentFixture<DangerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DangerDialogComponent]
    });
    fixture = TestBed.createComponent(DangerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
