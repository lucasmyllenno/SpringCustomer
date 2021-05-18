import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { CustomerRegisterModalComponent } from './customer-register-modal/customer-register-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EmailRegisterModalComponent } from './email-register-modal/email-register-modal.component';
import { EmailCategoryRegisterModalComponent } from './email-category-register-modal/email-category-register-modal.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
    declarations: [
        ToolbarComponent,
        CustomerRegisterModalComponent,
        EmailRegisterModalComponent,
        EmailCategoryRegisterModalComponent,
        ConfirmationDialogComponent
    ],
    imports: [
        FlexModule,
        CommonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        HttpClientModule,
        MatSelectModule,
        NgxMaskModule.forRoot(),
        MatRadioModule
    ],
    exports: [
        ToolbarComponent,
        CustomerRegisterModalComponent,
        EmailRegisterModalComponent,
        EmailCategoryRegisterModalComponent,
        ConfirmationDialogComponent
    ]
})
export class ModulesModule {
}
