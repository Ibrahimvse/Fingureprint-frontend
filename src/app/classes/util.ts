export class Period {
    start: string;
    end: string;
    constructor() {
        var dateObj = new Date();
        var month =
            dateObj.getUTCMonth() + 1 < 10
                ? '0' + (dateObj.getUTCMonth() + 1)
                : dateObj.getUTCMonth() + 1; //months from 1-12
        var day =
            (dateObj.getUTCDate()+1) < 10
                ? '0' + (dateObj.getUTCDate()+1)
                : (dateObj.getUTCDate()+1);
        var year = dateObj.getUTCFullYear();

        this.start = year + '-' + month + '-' + day;
        this.end = year + '-' + month + '-' + day;
    }
}