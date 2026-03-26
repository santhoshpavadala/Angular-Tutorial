import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUlList } from './my-ul-list';

describe('MyUlList', () => {
  let component: MyUlList;
  let fixture: ComponentFixture<MyUlList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyUlList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyUlList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
