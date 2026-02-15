import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxChild } from './ngrx-child';

describe('NgrxChild', () => {
  let component: NgrxChild;
  let fixture: ComponentFixture<NgrxChild>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgrxChild]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgrxChild);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
