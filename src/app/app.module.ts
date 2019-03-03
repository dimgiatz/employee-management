import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TextFieldModule} from '@angular/cdk/text-field';
import {
  MatSelectModule,
  MatDialogModule,
  MatTooltipModule,
  MatMenuModule,
  MatPaginatorModule,
  MatRadioModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatListModule,
  MatExpansionModule,
  MatCheckboxModule
} from '@angular/material';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { ActionNavbarComponent } from './components/layout/action-navbar/action-navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SkillCreateComponent } from './components/skill/skill-create/skill-create.component';
import { SkillListComponent } from './components/skill/skill-list/skill-list.component';
import { SkillEditComponent } from './components/skill/skill-edit/skill-edit.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { ChipComponent } from './components/helpers/chip/chip.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    ActionNavbarComponent,
    SkillCreateComponent,
    SkillListComponent,
    SkillEditComponent,
    CreateEmployeeComponent,
    ChipComponent,
    EmployeeListComponent,
    EmployeeEditComponent
  ],
  imports: [
    MatCheckboxModule,
    MatExpansionModule,
    MatListModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    TextFieldModule,
    MatDialogModule,
    MatMenuModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatPaginatorModule,
    MatRadioModule,
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, 
    MatToolbarModule, MatIconModule, MatSidenavModule, MatProgressSpinnerModule, MatGridListModule,
    MatButtonToggleModule,ScrollDispatchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
