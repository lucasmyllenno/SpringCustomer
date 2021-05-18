import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRegisterModalComponent } from './email-register-modal.component';

describe('EmailRegisterModalComponent', () => {
  let component: EmailRegisterModalComponent;
  let fixture: ComponentFixture<EmailRegisterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailRegisterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
