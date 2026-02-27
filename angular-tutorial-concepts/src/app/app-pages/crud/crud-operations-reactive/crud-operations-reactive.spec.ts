import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudOperationsReactive } from './crud-operations-reactive';

describe('CrudOperationsReactive', () => {
  let component: CrudOperationsReactive;
  let fixture: ComponentFixture<CrudOperationsReactive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudOperationsReactive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudOperationsReactive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
