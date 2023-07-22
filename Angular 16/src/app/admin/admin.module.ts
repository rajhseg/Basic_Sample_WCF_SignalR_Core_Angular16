import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Route[] = [
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
