import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FingureprintService } from '../../../services/fingureprint.service';
import { ModalService } from '../../../services/modal.service';
import { RoutingService } from '../../../services/routing.service';
import { dtOptions } from '../../../classes/datatable';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
})
export class EmployeesListComponent implements OnInit {


  public Employees: any[] = [];
  dtOptions: any = {};
  isLoading: Boolean = false;
  SelectedItem = null;
  constructor(
      public fingureprint: FingureprintService,
      public modal: ModalService,
      public router:RoutingService
  ) {
      this.fingureprint.routerlink = 'أدارة ألموظفين';
  }

  async ngOnInit() {
      this.dtOptions = {
          language: dtOptions.language,
      };
      this.getEmployees();
  }
  getEmployees() {
      this.Employees = [];
      this.isLoading = true;
      this.fingureprint.getEmployees().subscribe((response) => {
          this.Employees = <Array<any>>response;
          this.isLoading = false;
      });
  }
  delete(id: string) {
     this.fingureprint.deleteEmployee(id).subscribe((response)=>{
         this.Employees=response;
         this.modal.hide();

     },
     (error)=>{
         this.modal.hide();
         console.log(error);
     })

  }

}
