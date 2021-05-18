import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRegisterModalComponent } from './customer-register-modal.component';

describe('CustomerRegisterModalComponent', () => {
  let component: CustomerRegisterModalComponent;
  let fixture: ComponentFixture<CustomerRegisterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRegisterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
