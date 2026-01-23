import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorParent } from './decorator-parent';

describe('DecoratorParent', () => {
  let component: DecoratorParent;
  let fixture: ComponentFixture<DecoratorParent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecoratorParent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecoratorParent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
