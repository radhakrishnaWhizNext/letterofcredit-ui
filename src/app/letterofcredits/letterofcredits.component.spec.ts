import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterofcreditsComponent } from './letterofcredits.component';

describe('LetterofcreditsComponent', () => {
  let component: LetterofcreditsComponent;
  let fixture: ComponentFixture<LetterofcreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterofcreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterofcreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
