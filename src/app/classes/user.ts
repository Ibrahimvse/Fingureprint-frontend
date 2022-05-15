export class user {
    fullname: string;
    email: string;
    phone: string;
    password: string;
    password2: string;
    college: college = { _id: '', name: '' };
    fingureprintoffice: college = { _id: '', name: '' };
    role: string = 'Office';
    registrationdate: Date;
    divisions: string[] = [];
    isContainDivision(division: string) {
        return this.divisions.includes(division);
    }
    onDivisionChange(event) {
        if (event.target.checked) this.divisions.push(event.target.value);
        else {
            var index = this.divisions.indexOf(event.target.value);
            this.divisions.splice(index, 1);
        }
    }
    getCollegeDetails(){
        return this.college.name+' / '+this.fingureprintoffice.name;
    }
    fromJson(response:any){
        Object.assign(this,response)
        this.password=this.password2;
    }
}
interface college {
    name: string;
    _id: string;
}
