import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailModel } from './email.model';

@Injectable({
    providedIn: 'root'
})
export class EmailFormService {

    // @ts-ignore
    public formGroup: FormGroup;

    constructor(private fb: FormBuilder) {
        this.initForm();
    }

    public initForm(): void {
        this.formGroup = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            email: ['', Validators.required],
            customer: ['', Validators.required],
            category: ['', Validators.required]
        });
    }

    public reset(): void {
        this.formGroup?.reset();
    }

    public setValues(values: EmailModel): void {
        this.formGroup?.patchValue(values);
    }

    public getValues(): EmailModel {
        return this.formGroup?.getRawValue() as EmailModel;
    }

    public activeValidations() {
        this.formGroup.markAllAsTouched();
    }
}
