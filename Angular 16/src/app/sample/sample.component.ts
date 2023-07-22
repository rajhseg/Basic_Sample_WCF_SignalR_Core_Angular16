import { ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfterViewInit, computed, ViewChild } from '@angular/core';
import { Component, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CurrencyPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RginputComponent } from '../rginput/rginput.component';
import { FormFieldValue, RformfieldComponent } from '../rformfield/rformfield.component';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../server/api.service';
import { ContComponent } from '../cont/cont.component';
import { RouterModule } from '@angular/router';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
  selector: 'app-sample',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CurrencyPipe,
    RginputComponent,
    RformfieldComponent,
    MatIconModule,
    ContComponent,
    RouterModule,
    CommonModule],
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ApiService]
})
export class SampleComponent implements AfterViewInit {

  salary: number = 200;
  title = 'Samples';
  counter: WritableSignal<number> = signal(4);
  formgrp!: FormGroup;
  count$ = toObservable(this.counter);

  val: FormFieldValue = { query: '', scope: 'at' };

  fullName = computed(() => `Full Counter ${this.counter()}`);

  displayedColumns: string[] = ['position', 'name', 'symbol', 'weight'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private api: ApiService) {
    this.count$.subscribe((x) => {

    });

    this.formgrp = new FormGroup(
      {
        'firstname': new FormControl('100'),
        lastname: new FormControl('')
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  SalaryClick(): void {
    console.log("salary : " + this.salary);
  }

  submit(): void {
    console.log(this.formgrp);
  }
  AddCounter(): void {
    this.counter.set(2);
  }

  UpdateCounter(): void {
    this.counter.update((val) => val + 3);
  }

  MutateCounter(): void {
    this.counter.mutate((val) => val + 4);
  }

  applyFilter(value: Event) {
    this.dataSource.filter = (value.target as HTMLInputElement).value.trim().toLowerCase();
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.dataSource.data.map(t => t.weight).reduce((acc, value) => acc + value, 0);
  }

  sampleRequest() {
    this.api.getData().subscribe((x) => { });
  }
}
