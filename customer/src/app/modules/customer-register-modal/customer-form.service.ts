import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerModel } from './customer.model';

@Injectable({
    providedIn: 'root'
})
export class CustomerFormService {

    // @ts-ignore
    public formGroup: FormGroup;

    constructor(private fb: FormBuilder) {
        this.initForm();
    }

    public initForm(): void {
        this.formGroup = this.fb.group({
            id: [''],
            subscription: ['', Validators.required],
            nickname: ['', Validators.required],
            name: ['', Validators.required],
            status: ['', Validators.required]
        });
    }

    public reset(): void {
        this.formGroup?.reset();
        this.formGroup.get('status')?.patchValue('Ativo');
    }

    public setValues(values: CustomerModel): void {
        this.formGroup?.patchValue(values);
    }

    public getValues(): CustomerModel {
        return this.formGroup?.getRawValue() as CustomerModel;
    }

    public activeValidations() {
        this.formGroup.markAllAsTouched();
    }
}
