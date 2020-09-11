import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalReportsComponent } from './global-reports.component';

describe('GlobalReportsComponent', () => {
  let component: GlobalReportsComponent;
  let fixture: ComponentFixture<GlobalReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
