import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmailCategoryFormService } from './email-category-form.service';
import { EmailCategoryModel } from './email-category.model';
import { EmailCategoryService } from './email-category.service';

@Component({
    selector: 'app-email-category-register-modal',
    templateUrl: './email-category-register-modal.component.html',
    styleUrls: ['./email-category-register-modal.component.scss']
})
export class EmailCategoryRegisterModalComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: EmailCategoryModel,
                private dialogRef: MatDialogRef<EmailCategoryRegisterModalComponent>,
                public formService: EmailCategoryFormService,
                private service: EmailCategoryService) {
    }

    ngOnInit() {
        if (this.data) {
            this.formService.setValues(this.data);
        } else {
            this.formService.reset();
        }
    }

    public onClickSubmit(): void {
        const values = this.formService.getValues();
        if (this.formService.formGroup.valid) {
            if (!values.id) {
                this.service.postEmailCategory(values).subscribe(
                    () => this.closeModal(true),
                    error => this.closeModal(false)
                );
            } else {
                this.service.putEmailCategory(values.id, values).subscribe(
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
