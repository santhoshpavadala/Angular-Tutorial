import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavascriptInterview } from './javascript-interview';

describe('JavascriptInterview', () => {
  let component: JavascriptInterview;
  let fixture: ComponentFixture<JavascriptInterview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JavascriptInterview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JavascriptInterview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
