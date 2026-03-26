import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewPreparations } from './interview-preparations';

describe('InterviewPreparations', () => {
  let component: InterviewPreparations;
  let fixture: ComponentFixture<InterviewPreparations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewPreparations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewPreparations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
