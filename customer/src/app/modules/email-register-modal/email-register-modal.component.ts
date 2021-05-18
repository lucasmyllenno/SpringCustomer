import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmailModel } from './email.model';
import { EmailFormService } from './email-form.service';
import { EmailService } from './email.service';
import { EmailCategoryRegisterModalComponent } from '../email-category-register-modal/email-category-register-modal.component';
import { BehaviorSubject } from 'rxjs';
import { EmailCategoryModel } from '../email-category-register-modal/email-category.model';
import { EmailCategoryService } from '../email-category-register-modal/email-category.service';

@Component({
    selector: 'app-email-register-modal',
    templateUrl: './email-register-modal.component.html',
    styleUrls: ['./email-register-modal.component.scss']
})
export class EmailRegisterModalComponent implements OnInit {

    public categories: BehaviorSubject<EmailCategoryModel[] | undefined>;

    constructor(@Inject(MAT_DIALOG_DATA) public data: EmailModel,
                private dialogRef: MatDialogRef<EmailRegisterModalComponent>,
                public formService: EmailFormService,
                private service: EmailService,
                private categoryService: EmailCategoryService,
                private dialog: MatDialog) {
        this.categories = new BehaviorSubject<EmailCategoryModel[] | undefined>(undefined);
    }

    ngOnInit() {
        const customer = this.data.customer;
        if (this.data?.id) {
            this.formService.setValues(this.data);
        } else {
            this.formService.reset();
        }
        this.formService.formGroup.get('customer')?.setValue(customer);
        this.fetchCategories();
    }

    public fetchCategories(): void {
        this.categoryService.getEmailsCategory().subscribe(categories => {
            if (categories) {
                this.categories.next(categories);
                this.formService.formGroup.get('category')?.setValue(this.data.category);
            }
        });
    }

    public createEmailCategory(): void {
        this.dialog.open(EmailCategoryRegisterModalComponent).afterClosed().subscribe(result => {
            if (result) {
                this.fetchCategories();
            }
        });
    }

    public onClickSubmit(): void {
        const values = this.formService.getValues();
        if (this.formService.formGroup.valid) {
            if (!values.id) {
                this.service.postEmail(values).subscribe(
                    () => this.closeModal(true),
                    error => this.closeModal(false)
                );
            } else {
                this.service.putEmail(values.id, values).subscribe(
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
