import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurvivorListComponent } from './survivor-list.component';

describe('SurvivorListComponent', () => {
  let component: SurvivorListComponent;
  let fixture: ComponentFixture<SurvivorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurvivorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurvivorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
