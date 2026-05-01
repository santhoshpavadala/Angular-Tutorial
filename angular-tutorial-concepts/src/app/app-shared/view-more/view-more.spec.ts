import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMore } from './view-more';

describe('ViewMore', () => {
  let component: ViewMore;
  let fixture: ComponentFixture<ViewMore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
