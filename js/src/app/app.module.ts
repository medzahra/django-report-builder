import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';
import { FormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatToolbarModule,
  MatSelectModule,
  MatSidenavModule,
} from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NewReportComponent } from './new-report/new-report.component';
import { MainComponent } from './main/main.component';
import { LeftSidebarComponent } from './main/left-sidebar/';

import { ApiService } from './api.service';

import { reducers, metaReducers } from './reducers';
import { ReportEffects } from './effects/reports';

const appRoutes: Routes = [
  { path: '', component: MainComponent, data: {title: 'Reports'}},
  { path: 'report/add', component: NewReportComponent, data: {title: 'Add New Report'} },
];

export function xsrfFactory() {
  return new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');
}

export const MatModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatToolbarModule,
  MatSelectModule,
  MatSidenavModule,
];

@NgModule({
  declarations: [
    AppComponent,
    NewReportComponent,
    MainComponent,
    LeftSidebarComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([ReportEffects]),
    HttpModule,
    FormsModule,
    ...MatModules,
  ],
  providers: [
    ApiService,
    {provide: XSRFStrategy, useFactory: xsrfFactory},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
