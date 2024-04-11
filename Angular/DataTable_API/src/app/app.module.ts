import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material-module'
import { HttpClientModule } from '@angular/common/http'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AddPessoaComponent } from './views/home/add-pessoa/add-pessoa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './views/home/confirmation-dialog/confirmation-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { EditPessoaComponent } from './views/home/edit-pessoa/edit-pessoa.component';
import { RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    AddPessoaComponent,
    ConfirmationDialogComponent,
    EditPessoaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
