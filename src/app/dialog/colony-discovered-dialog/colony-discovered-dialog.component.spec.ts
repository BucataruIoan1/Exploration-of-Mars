import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColonyDiscoveredDialogComponent } from './colony-discovered-dialog.component';

describe('ColonyDiscoveredDialogComponent', () => {
  let component: ColonyDiscoveredDialogComponent;
  let fixture: ComponentFixture<ColonyDiscoveredDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColonyDiscoveredDialogComponent]
    });
    fixture = TestBed.createComponent(ColonyDiscoveredDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
