import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EmailModel } from './email.model';

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    constructor(private http: HttpClient) {
    }

    public getEmails(): Observable<EmailModel[]> {
        return this.http.get<EmailModel[]>(`${environment.endpoints.path}/email`);
    }

    public getEmailById(id: number): Observable<EmailModel> {
        return this.http.get<EmailModel>(`${environment.endpoints.path}/email/${id}`);
    }

    public getEmailsByCustomerId(customerId: number): Observable<EmailModel[]> {
        return this.http.get<EmailModel[]>(`${environment.endpoints.path}/email/customer/${customerId}`);
    }

    public postEmail(email: EmailModel): Observable<EmailModel> {
        return this.http.post<EmailModel>(`${environment.endpoints.path}/email`, email);
    }

    public putEmail(id: number, email: EmailModel): Observable<EmailModel> {
        return this.http.put<EmailModel>(`${environment.endpoints.path}/email/${id}`, email);
    }

    public deleteEmail(id: number): Observable<EmailModel> {
        return this.http.delete<EmailModel>(`${environment.endpoints.path}/email/${id}`);
    }
}
