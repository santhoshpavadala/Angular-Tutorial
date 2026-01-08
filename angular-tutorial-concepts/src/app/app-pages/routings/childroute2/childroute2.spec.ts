import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Childroute2 } from './childroute2';

describe('Childroute2', () => {
  let component: Childroute2;
  let fixture: ComponentFixture<Childroute2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Childroute2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Childroute2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
