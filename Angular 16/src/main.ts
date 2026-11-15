import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
 
 let antiforgry_token =  localStorage.getItem('anti_token') ?? "";

  const clonedReq = req.clone({
    withCredentials: true,
    setHeaders:{
    'A_xsrf_token' : antiforgry_token
    }
  });
  return next(clonedReq);
};

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(withInterceptors([credentialsInterceptor])),
        importProvidersFrom(BrowserModule, AppRoutingModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSortModule, MatPaginatorModule, ReactiveFormsModule, MatButtonModule, MatIconModule, FormsModule),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));

