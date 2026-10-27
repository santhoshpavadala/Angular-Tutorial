import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngMaterial } from './ang-material';

describe('AngMaterial', () => {
  let component: AngMaterial;
  let fixture: ComponentFixture<AngMaterial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngMaterial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngMaterial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
