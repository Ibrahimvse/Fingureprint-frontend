
export class FingurePrintOffice{
    name:string='';
    admin:string='';
    Departments:Array<department>=[];
    Devices:Array<device>=[];
    TimePeriod = {
        inTime: '08:30',
        outTime: '14:30',
    };
    addDepartment(){
        this.Departments.push(new department())
    }
    removeDepartment(i:number){
        this.Departments.splice(i,1);
    }
    addDevice(){
        var d=new device();
        d.ip="192.168.01."+(this.Devices.length+1);
        this.Devices.push(d)
    }
    removeDevice(i:number){
        this.Devices.splice(i,1)
    }
    addUnit(i:number) {
        this.Departments[i].units.push(new unit);
    }
    removeUnit(i:number,j:number){
        this.Departments[i].units.splice(j,1);
    }
    fromJson(response:any){
        this.name=response.name;
        this.admin=response.admin;
        this.Departments=response.Departments;
        this.Devices=response.Devices;  
        this.TimePeriod=response.TimePeriod; 
    }
}
export class department{
    name:string='';
    units:Array<unit>=[];
}
export class device{
    name:string='';
    ip:string='';
    status:string='no'
}
export class unit{
    name:string='';
}