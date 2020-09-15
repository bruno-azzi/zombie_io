import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionToggleComponent } from './condition-toggle.component';

describe('ConditionToggleComponent', () => {
  let component: ConditionToggleComponent;
  let fixture: ComponentFixture<ConditionToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
