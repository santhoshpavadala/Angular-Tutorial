import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifecyclePractices } from './lifecycle-practices';

describe('LifecyclePractices', () => {
  let component: LifecyclePractices;
  let fixture: ComponentFixture<LifecyclePractices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifecyclePractices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifecyclePractices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
