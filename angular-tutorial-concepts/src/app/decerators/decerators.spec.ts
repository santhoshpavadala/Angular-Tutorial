import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Decerators } from './decerators';

describe('Decerators', () => {
  let component: Decerators;
  let fixture: ComponentFixture<Decerators>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Decerators]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Decerators);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
