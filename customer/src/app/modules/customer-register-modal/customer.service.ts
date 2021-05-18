import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CustomerModel } from './customer.model';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private http: HttpClient) {
    }

    public getCustomers(): Observable<CustomerModel[]> {
        return this.http.get<CustomerModel[]>(`${environment.endpoints.path}/customer`);
    }

    public getCustomerById(id: number): Observable<CustomerModel> {
        return this.http.get<CustomerModel>(`${environment.endpoints.path}/customer/${id}`);
    }

    public postCustomer(customer: CustomerModel): Observable<CustomerModel> {
        return this.http.post<CustomerModel>(`${environment.endpoints.path}/customer`, customer);
    }

    public putCustomer(id: number, customer: CustomerModel): Observable<CustomerModel> {
        return this.http.put<CustomerModel>(`${environment.endpoints.path}/customer/${id}`, customer);
    }

    public deleteCustomer(id: number): Observable<CustomerModel> {
        return this.http.delete<CustomerModel>(`${environment.endpoints.path}/customer/${id}`);
    }
}
