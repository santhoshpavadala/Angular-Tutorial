import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpInterceptors } from './http-interceptors';

describe('HttpInterceptors', () => {
  let component: HttpInterceptors;
  let fixture: ComponentFixture<HttpInterceptors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpInterceptors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpInterceptors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
