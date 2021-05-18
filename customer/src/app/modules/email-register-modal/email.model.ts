import { CustomerModel } from '../customer-register-modal/customer.model';
import { EmailCategoryModel } from '../email-category-register-modal/email-category.model';

export interface EmailModel {
    id?: number;
    name?: string;
    email?: string;
    customer: CustomerModel;
    category?: EmailCategoryModel;
    createdAt?: Date;
    updatedAt?: Date;
}
