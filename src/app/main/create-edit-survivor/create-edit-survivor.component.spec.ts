import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSurvivorComponent } from './create-edit-survivor.component';

describe('CreateEditSurvivorComponent', () => {
  let component: CreateEditSurvivorComponent;
  let fixture: ComponentFixture<CreateEditSurvivorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditSurvivorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditSurvivorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
