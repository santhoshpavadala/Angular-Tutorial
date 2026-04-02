import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTemplateForms } from './material-template-forms';

describe('MaterialTemplateForms', () => {
  let component: MaterialTemplateForms;
  let fixture: ComponentFixture<MaterialTemplateForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialTemplateForms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialTemplateForms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
