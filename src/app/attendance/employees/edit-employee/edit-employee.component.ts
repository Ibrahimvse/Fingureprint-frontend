import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FingureprintService } from '../../../services/fingureprint.service';
import { RoutingService } from '../../../services/routing.service';
import { Employee } from '../../../classes/employee';
import { department } from '../../../classes/colleges';
@Component({
    selector: 'app-edit-employee',
    templateUrl: './edit-employee.component.html',
})
export class EditEmployeeComponent implements OnInit {
    Employee: Employee = new Employee();
    id: string;
    SelectedDepartment: department=new department();
    constructor(
        public fingureprint: FingureprintService,
        public Activerouter: ActivatedRoute,
        public router: RoutingService
    ) {
        this.fingureprint.routerlink = 'أدارة الموظفين-تحديث بيانات الموظف';
    }

    async ngOnInit() {
        this.id = await this.Activerouter.snapshot.params['id'];
        this.getEmployee();
    }
    getEmployee() {
        this.fingureprint.getEmployee(this.id).subscribe(
            (response) => {
                this.Employee = response;
                this.onDepartmentChange(null);
            },
            (error) => {
                console.log(error);
            }
        );
    }
    onDepartmentChange(event) {
        
        var index = this.fingureprint.fingureprintoffice.Departments.findIndex(
            (d) => (d.name == this.Employee.department)
        );
        if (index != -1)
            this.SelectedDepartment =
                this.fingureprint.fingureprintoffice.Departments[index];
        console.log(this.Employee.unit)

    }
    submit() {
        
        this.fingureprint.updateEmployee(this.id,this.Employee).subscribe((response)=>{
            this.router.navigateTo('fingureprint/employees/employeeslist');
        },
        (error)=>{
            console.log(error)
        });
    }
}
