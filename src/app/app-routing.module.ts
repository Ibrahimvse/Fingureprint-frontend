import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FingureprintComponent } from './attendance/fingureprint/fingureprint.component';
import { EditEmployeeComponent } from './attendance/employees/edit-employee/edit-employee.component'
import { EmployeesListComponent } from './attendance/employees/employees-list/employees-list.component'

import {
    EditCollegeComponent,
} from './admin/colleges/new-college/new-college.component';
import { FingureprintEmployeesComponent } from './attendance/employees/employees.component';
import { DevicesComponent } from './attendance/devices/devices.component';
import { DailyReportComponent } from './attendance/daily-report/daily-report.component';
import { MonthlyReportComponent } from './attendance/monthly-report/monthly-report.component';
import { EmployeeReportComponent } from './attendance/employees/employee-report/employee-report.component'
import { EmployeeTimeoffComponent } from './attendance/employees/employee-timeoff/employee-timeoff.component'
import { TimeoffReportComponent } from './attendance/timeoff-report/timeoff-report.component'
import { BackupComponent } from './attendance/backup/backup.component'

const routes: Routes = [
    {
        path: 'fingureprint',
        component: FingureprintComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'devices',
            },
            {
                path: 'employees',
                component: FingureprintEmployeesComponent,
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'employeeslist',
                    },
                    {   path:'employeeslist',component:EmployeesListComponent},
                    {   path:'edit/:id',component:EditEmployeeComponent},
                    {   path:'employeereport/:id',component:EmployeeReportComponent},
                    {   path:'employeetimeoff/:id',component:EmployeeTimeoffComponent},
                ]
            },
            {
                path: 'devices',
                component: DevicesComponent
            },
            {
                path: 'timeoffReport',
                component: TimeoffReportComponent
            },
            {
                path: 'dailyreport',
                component: DailyReportComponent
            },
            {
                path: 'monthlyreport',
                component: MonthlyReportComponent
            },
            {
                path: 'editcollege',
                component: EditCollegeComponent,
            },
            {
                path: 'backup',
                component: BackupComponent,
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
