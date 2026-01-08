import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Routings } from './routings';

describe('Routings', () => {
  let component: Routings;
  let fixture: ComponentFixture<Routings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Routings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Routings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
