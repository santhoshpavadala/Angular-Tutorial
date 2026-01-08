import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Childroute1 } from './childroute1';

describe('Childroute1', () => {
  let component: Childroute1;
  let fixture: ComponentFixture<Childroute1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Childroute1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Childroute1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
