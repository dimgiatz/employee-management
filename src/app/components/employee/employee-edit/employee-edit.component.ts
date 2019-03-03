import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  eid: any;
  showPage:boolean=false;
  employee: any;
  allSkills:any;
  checkedSkills:any={};

  constructor(private data:DataService,private snackBar: MatSnackBar,private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.params.subscribe(r=>{
      this.eid=r.id;
      this.data.getEmployeeById(this.eid).subscribe(c=>{
        this.employee=c.results;
        console.log(this.employee)
        if(this.employee){
          this.employee.hiredAt=moment(new Date(this.employee.hiredAt), 'YYYY-MM-DDTHH:mm:ss+-HH:mm:ss').toDate().toLocaleString();
          this.employee.updatedAt=moment(new Date(this.employee.updatedAt), 'YYYY-MM-DDTHH:mm:ss+-HH:mm:ss').toDate().toLocaleString();
        }
        if(this.employee){
          this.showPage=true;
          this.employee.skills.forEach(c=>{
            this.checkedSkills[c]=true;
          })
        } 
      },e=>{console.error(e)});
    },e=>{console.error(e)});

    this.data.getSkills("",{},0,1).subscribe(r=>{
      this.allSkills=r.results;
    },e=>console.error(e))
  }

  onYesClick(f:NgForm){
    let skillIds=Object.keys(this.checkedSkills).filter(c=>this.checkedSkills[c]);
    let update=f.form.value;
    update["skills"]=skillIds
    this.data.updateEmployee(this.eid,update).subscribe(d=>{
      if(d.results)
        this.snackBar.open("Επεξεργασία Επιτυχής",null,{duration:1000,horizontalPosition:'right',verticalPosition:'top',panelClass:['snack-success']})
   },e=>{
     this.snackBar.open("Ανεπιτυχής Ενέργεια",null,{duration:1000,horizontalPosition:'right',verticalPosition:'top',panelClass:['snack-error']});
     console.log(e);
    });
  }


}
