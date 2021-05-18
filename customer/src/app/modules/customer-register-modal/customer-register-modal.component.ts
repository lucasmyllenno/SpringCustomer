import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerModel } from './customer.model';
import { CustomerFormService } from './customer-form.service';
import { CustomerService } from './customer.service';
import { EmailRegisterModalComponent } from '../email-register-modal/email-register-modal.component';
import { EmailService } from '../email-register-modal/email.service';
import { BehaviorSubject } from 'rxjs';
import { EmailModel } from '../email-register-modal/email.model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-customer-register-modal',
    templateUrl: './customer-register-modal.component.html',
    styleUrls: ['./customer-register-modal.component.scss']
})
export class CustomerRegisterModalComponent implements OnInit {

    public defaultImageProfile = 'https://www.pop-sc.rnp.br/wtr/2018/sites/wtrPopSC/files/default-person.png';
    public emails: BehaviorSubject<EmailModel[] | undefined>;

    constructor(@Inject(MAT_DIALOG_DATA) public data: CustomerModel,
                private dialogRef: MatDialogRef<CustomerRegisterModalComponent>,
                public formService: CustomerFormService,
                private service: CustomerService,
                private emailService: EmailService,
                private dialog: MatDialog) {
        this.emails = new BehaviorSubject<EmailModel[] | undefined>(undefined);
    }

    ngOnInit(): void {
        if (this.data) {
            this.formService.setValues(this.data);
        } else {
            this.formService.reset();
        }
        this.fetchEmails();
    }

    private fetchEmails(): void {
        if (this.data) {
            this.emailService.getEmailsByCustomerId(this.data.id).subscribe(emails => {
                if (emails) {
                    this.emails.next(emails);
                }
            });
        }
    }

    public createEmail(): void {
        const currentEmail: EmailModel = { customer: this.formService.getValues() };
        this.dialog.open(EmailRegisterModalComponent, { data: currentEmail }
        ).afterClosed().subscribe(result => {
            if (result) {
                this.fetchEmails();
            }
        });
    }

    public editEmail(email: EmailModel): void {
        this.dialog.open(EmailRegisterModalComponent, { data: email }
        ).afterClosed().subscribe(result => {
            if (result) {
                this.fetchEmails();
            }
        });
    }

    public removeEmail(emailId: number): void {
        this.dialog.open(ConfirmationDialogComponent, {data: 'Você tem certeza que deseja remover este email?'}
        ).afterClosed().subscribe(result => {
            if (result) {
                this.emailService.deleteEmail(emailId).subscribe(
                    () => this.fetchEmails()
                );
            }
        });
    }

    public onClickSubmit(): void {
        const values = this.formService.getValues();
        if (this.formService.formGroup.valid) {
            if (!values.id) {
                this.service.postCustomer(values).subscribe(
                    () => this.closeModal(true),
                    error => this.closeModal(false)
                );
            } else {
                this.service.putCustomer(values.id, values).subscribe(
                    () => this.closeModal(true),
                    error => this.closeModal(false)
                );
            }
        } else {
            this.formService.activeValidations();
        }
    }

    public closeModal(success: boolean): void {
        this.dialogRef.close(success);
    }
}
