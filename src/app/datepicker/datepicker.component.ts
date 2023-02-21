import { Component, OnInit, EventEmitter, Output, Input,AfterViewInit , OnChanges, SimpleChanges} from "@angular/core";
declare const $: any;

class util{
  static setElementId(name:string):string{
     var id = name + Math.round(Math.random() * 10000);
      return id;
  }
  static setElementLabel(label:string):string{
      return label+" : "
   }

  getDateStringValue(dateObj:Date): string {
      var month =
          dateObj.getMonth() +1 < 10
              ? "0" + (dateObj.getMonth() + 1)
              : dateObj.getMonth() + 1; //months from 1-12
      var day =
          dateObj.getDate() < 10
              ? "0" + (dateObj.getDate() )
              : dateObj.getDate() ;
      var year = dateObj.getFullYear();
      var value= year + "-" + month + "-" + day;
      return value
  }
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Input() input: Date;
  @Input() name: string;
  @Input() label: string;
  @Input() max: Date;
  @Output() dateChange = new EventEmitter<Date>();
  id: string="";
  constructor() {}

  ngOnInit(): void {
      this.id = util.setElementId(this.name);
      this.label =util.setElementLabel(this.label)
  }
  onDateChange(event:any):void{
      this.dateChange.emit(event);
  }
  triggerDate(){
    
  }

}
