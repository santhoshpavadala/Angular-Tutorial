import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialReactiveForms } from './material-reactive-forms';

describe('MaterialReactiveForms', () => {
  let component: MaterialReactiveForms;
  let fixture: ComponentFixture<MaterialReactiveForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialReactiveForms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialReactiveForms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
