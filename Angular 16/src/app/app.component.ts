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
import { RginputComponent } from './rginput/rginput.component';
import { FormFieldValue, RformfieldComponent } from './rformfield/rformfield.component';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from './server/api.service';
import { ContComponent } from './cont/cont.component';
import { ChildrenOutletContexts, RouterModule } from '@angular/router';
import { FadeInAnimation } from './animations/animations';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
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
    RouterModule
  ],
  viewProviders: [ApiService],
  animations: [FadeInAnimation]
})
export class AppComponent {

  constructor(private contexts: ChildrenOutletContexts) { }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
