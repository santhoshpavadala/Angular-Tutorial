import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsForms } from './rxjs-forms';

describe('RxjsForms', () => {
  let component: RxjsForms;
  let fixture: ComponentFixture<RxjsForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsForms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsForms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
