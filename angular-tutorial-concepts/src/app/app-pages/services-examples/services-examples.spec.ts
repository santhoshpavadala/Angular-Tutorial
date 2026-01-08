import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesExamples } from './services-examples';

describe('ServicesExamples', () => {
  let component: ServicesExamples;
  let fixture: ComponentFixture<ServicesExamples>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesExamples]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesExamples);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
