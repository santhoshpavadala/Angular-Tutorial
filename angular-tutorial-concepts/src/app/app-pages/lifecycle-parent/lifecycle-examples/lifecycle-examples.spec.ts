import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifecycleExamples } from './lifecycle-examples';

describe('LifecycleExamples', () => {
  let component: LifecycleExamples;
  let fixture: ComponentFixture<LifecycleExamples>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifecycleExamples]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifecycleExamples);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
