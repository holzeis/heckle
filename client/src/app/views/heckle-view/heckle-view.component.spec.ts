import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeckleViewComponent } from './heckle-view.component';

describe('HeckleViewComponent', () => {
  let component: HeckleViewComponent;
  let fixture: ComponentFixture<HeckleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeckleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeckleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
