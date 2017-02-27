import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTesterComponent } from './login-tester.component';

describe('LoginTesterComponent', () => {
  let component: LoginTesterComponent;
  let fixture: ComponentFixture<LoginTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
