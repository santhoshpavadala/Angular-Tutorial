import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsApiComponent } from './reactive-forms-api';

describe('ReactiveFormsApiComponent', () => {
  let component: ReactiveFormsApiComponent;
  let fixture: ComponentFixture<ReactiveFormsApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormsApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
