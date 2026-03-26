import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngUnsubscribe } from './ang-unsubscribe';

describe('AngUnsubscribe', () => {
  let component: AngUnsubscribe;
  let fixture: ComponentFixture<AngUnsubscribe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngUnsubscribe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngUnsubscribe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
