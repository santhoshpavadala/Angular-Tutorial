import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ngrx } from './ngrx';

describe('Ngrx', () => {
  let component: Ngrx;
  let fixture: ComponentFixture<Ngrx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ngrx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ngrx);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
