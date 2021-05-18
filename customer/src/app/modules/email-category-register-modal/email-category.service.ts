import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EmailCategoryModel } from './email-category.model';

@Injectable({
    providedIn: 'root'
})
export class EmailCategoryService {

    constructor(private http: HttpClient) {
    }

    public getEmailsCategory(): Observable<EmailCategoryModel[]> {
        return this.http.get<EmailCategoryModel[]>(`${environment.endpoints.path}/email-category`);
    }

    public getEmailCategoryById(id: number): Observable<EmailCategoryModel> {
        return this.http.get<EmailCategoryModel>(`${environment.endpoints.path}/email-category/${id}`);
    }

    public postEmailCategory(email: EmailCategoryModel): Observable<EmailCategoryModel> {
        return this.http.post<EmailCategoryModel>(`${environment.endpoints.path}/email-category`, email);
    }

    public putEmailCategory(id: number, email: EmailCategoryModel): Observable<EmailCategoryModel> {
        return this.http.put<EmailCategoryModel>(`${environment.endpoints.path}/email-category/${id}`, email);
    }

    public deleteEmailCategory(id: number): Observable<EmailCategoryModel> {
        return this.http.delete<EmailCategoryModel>(`${environment.endpoints.path}/email-category/${id}`);
    }
}
