import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailCategoryModel } from './email-category.model';

@Injectable({
    providedIn: 'root'
})
export class EmailCategoryFormService {

    // @ts-ignore
    public formGroup: FormGroup;

    constructor(private fb: FormBuilder) {
        this.initForm();
    }

    public initForm(): void {
        this.formGroup = this.fb.group({
            id: [''],
            name: ['', Validators.required]
        });
    }

    public reset(): void {
        this.formGroup?.reset();
    }

    public setValues(values: EmailCategoryModel): void {
        this.formGroup?.patchValue(values);
    }

    public getValues(): EmailCategoryModel {
        return this.formGroup?.getRawValue() as EmailCategoryModel;
    }

    public activeValidations() {
        this.formGroup.markAllAsTouched();
    }
}
