
export class TimePeriod {
    start:Date;
    end:Date;
    constructor (){
        this.start=new Date();
        this.end=new Date();
    }
}

export class DateUtil{
    static getDateString(date:Date):string{
        return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
    }
}


