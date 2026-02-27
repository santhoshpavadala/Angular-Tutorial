import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudApiMethods } from './crud-api-methods';

describe('CrudApiMethods', () => {
  let component: CrudApiMethods;
  let fixture: ComponentFixture<CrudApiMethods>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudApiMethods]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudApiMethods);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
