import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgContent } from './ng-content';

describe('NgContent', () => {
  let component: NgContent;
  let fixture: ComponentFixture<NgContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
