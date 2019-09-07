import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkViewComponent } from './talk-view.component';

describe('TalkViewComponent', () => {
  let component: TalkViewComponent;
  let fixture: ComponentFixture<TalkViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
