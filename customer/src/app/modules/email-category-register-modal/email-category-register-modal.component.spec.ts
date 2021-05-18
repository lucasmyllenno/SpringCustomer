import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCategoryRegisterModalComponent } from './email-category-register-modal.component';

describe('EmailCategoryRegisterModalComponent', () => {
  let component: EmailCategoryRegisterModalComponent;
  let fixture: ComponentFixture<EmailCategoryRegisterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailCategoryRegisterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCategoryRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
