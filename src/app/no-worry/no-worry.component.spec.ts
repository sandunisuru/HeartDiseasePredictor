import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoWorryComponent } from './no-worry.component';

describe('NoWorryComponent', () => {
  let component: NoWorryComponent;
  let fixture: ComponentFixture<NoWorryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoWorryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoWorryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
