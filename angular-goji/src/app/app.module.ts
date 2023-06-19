import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserComponent } from './components/user/user.component';
import {Dialog, ListComponent} from './components/list/list.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioModule} from "@angular/material/radio";
import {MatInputModule} from "@angular/material/input";
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    ListComponent,
    Dialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [Dialog],
  exports: [
    MatDialogModule
  ]
})
export class AppModule { }
