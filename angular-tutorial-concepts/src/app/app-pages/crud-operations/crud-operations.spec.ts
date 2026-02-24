import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudOperations } from './crud-operations';

describe('CrudOperations', () => {
  let component: CrudOperations;
  let fixture: ComponentFixture<CrudOperations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudOperations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudOperations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
