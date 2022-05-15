import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { ModalModule, BsModalRef } from "ngx-bootstrap/modal";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { MaterialModule} from"./material"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home/home.component';
import { TopheaderComponent } from './home/headers/topheader/topheader.component';
import { FooterComponent } from './home/headers/footer/footer.component';
import { FingureprintComponent } from './attendance/fingureprint/fingureprint.component';
import { EditCollegeComponent } from './admin/colleges/new-college/new-college.component';
import { FingureprintEmployeesComponent } from './attendance/employees/employees.component';
import { DevicesComponent } from './attendance/devices/devices.component';
import { DailyReportComponent } from './attendance/daily-report/daily-report.component';
import { MonthlyReportComponent } from './attendance/monthly-report/monthly-report.component';
import { EditEmployeeComponent } from './attendance/employees/edit-employee/edit-employee.component';
import { EmployeesListComponent } from './attendance/employees/employees-list/employees-list.component';
import { EmployeeReportComponent } from './attendance/employees/employee-report/employee-report.component';
import { EmployeeTimeoffComponent } from './attendance/employees/employee-timeoff/employee-timeoff.component';
import { TimeoffReportComponent } from './attendance/timeoff-report/timeoff-report.component';
import { BackupComponent } from './attendance/backup/backup.component'



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopheaderComponent,
    FooterComponent,
    FingureprintComponent,
    EditCollegeComponent,
    FingureprintEmployeesComponent, DevicesComponent, DailyReportComponent, MonthlyReportComponent, 
    EditEmployeeComponent, EmployeesListComponent, EmployeeReportComponent, EmployeeTimeoffComponent, TimeoffReportComponent, BackupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    AppRoutingModule,
    MaterialModule,
    ModalModule.forRoot(),
    NgbModule
  ],
  providers: [
    BsModalRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
