import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalksViewComponent } from './talks-view.component';

describe('TalksViewComponent', () => {
  let component: TalksViewComponent;
  let fixture: ComponentFixture<TalksViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalksViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalksViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
