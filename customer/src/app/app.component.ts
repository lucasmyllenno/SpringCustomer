import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { CustomerModel } from './modules/customer-register-modal/customer.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CustomerRegisterModalComponent } from './modules/customer-register-modal/customer-register-modal.component';
import { CustomerService } from './modules/customer-register-modal/customer.service';
import { ConfirmationDialogComponent } from './modules/confirmation-dialog/confirmation-dialog.component';

export interface ColumnModel {
    title: string;
    property: string;
    displayed: boolean;
    displayFn?: any;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    public dataSource: MatTableDataSource<CustomerModel>;
    public searchFormControl: FormControl;

    public columns: ColumnModel[] = [
        {title: 'Inscrição', property: 'subscription', displayed: true},
        {title: 'Apelido', property: 'nickname', displayed: true},
        {title: 'Nome', property: 'name', displayed: true},
        {title: 'Status', property: 'status', displayed: true},
        {title: 'Criado em', property: 'createdAt', displayed: true, displayFn: (date: Date) => new Date(date).toLocaleString()},
        {title: 'Atualizado em', property: 'updatedAt', displayed: true, displayFn: (date: Date) => new Date(date).toLocaleString()}
    ];

    constructor(private dialog: MatDialog,
                private snackBar: MatSnackBar,
                private customerService: CustomerService) {
        this.dataSource = new MatTableDataSource();
        this.searchFormControl = new FormControl();
    }

    ngOnInit(): void {
        this.fetchData();
        this.startSearchFilter();
    }

    public get displayedColumns(): string[] {
        const displayedColumns = this.columns.filter(
            column => column.displayed
        );
        const columnsProperty = displayedColumns.map(
            column => column.property
        );
        return [...columnsProperty, 'actions'];
    }

    public fetchData(): void {
        this.customerService.getCustomers().subscribe((customer) => {
            if (customer) {
                this.dataSource.data = customer;
                this.dataSource.paginator = this.translatedPaginator(this.paginator);
                this.dataSource.sort = this.sort;
            }
        });
    }

    public createCustomer(): void {
        this.dialog.open(CustomerRegisterModalComponent).afterClosed().subscribe(result => {
            if (result) {
                this.fetchData();
            }
        });
    }

    public updateCustomer(customer: CustomerModel): void {
        this.dialog.open(CustomerRegisterModalComponent, { data: customer }
        ).afterClosed().subscribe(result => {
            if (result) {
                this.fetchData();
            }
        });
    }

    public deleteCustomer(customerId: number): void {
        this.dialog.open(ConfirmationDialogComponent, {data: 'Você tem certeza que deseja remover este cliente?'}
        ).afterClosed().subscribe(result => {
            if (result) {
                this.customerService.deleteCustomer(customerId).subscribe(
                    () => this.fetchData(),
                    error => console.log(error)
                );
            }
        });
    }

    public startSearchFilter(): void {
        this.searchFormControl.valueChanges.pipe(
            distinctUntilChanged(),
            debounceTime(150)
        ).subscribe((value) => {
            if (!this.dataSource) {
                return;
            }
            value = value.trim();
            value = value.toLowerCase();
            this.dataSource.filter = value;
        });
    }

    public toggleColumnVisibility(column: ColumnModel, event: any): void {
        event.stopPropagation();
        event.stopImmediatePropagation();
        column.displayed = !column.displayed;
    }

    public openSnackBar(message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 2000,
            horizontalPosition: 'center'
        });
    }

    public translatedPaginator(paginator: MatPaginator): MatPaginator {
        paginator._intl.itemsPerPageLabel = 'Itens por página';
        paginator._intl.nextPageLabel = 'Próximos itens';
        paginator._intl.previousPageLabel = 'Itens anteriores';
        return paginator;
    }
}
