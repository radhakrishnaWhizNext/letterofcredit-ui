import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocDetailComponent } from './loc-detail.component';

describe('LocDetailComponent', () => {
  let component: LocDetailComponent;
  let fixture: ComponentFixture<LocDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
