import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  skills:any=[];
  skillNames:any=[];
  selectedSkills:any=[];
  skillIDs:string[];

  constructor(private data:DataService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSkills();
  }

  getSkills(){
    this.data.getSkills("","",0,1).subscribe(c=>{
      this.skills=c.results;
      this.skillNames=this.skills.map(c=>c.name);
    },e=>console.error(e));
  }

  onSkillsChange(s){
    this.selectedSkills=s;
  }

  onYesClick(f:NgForm){
    this.data.upsertSkills(this.selectedSkills.map(c=>({"name":c}))).subscribe(r=>{
      this.getSkills();
      this.skillIDs=this.skills.filter(c=>this.selectedSkills.includes(c.name)).map(c=>c._id);
      this.data.createEmployee(f.value.name,f.value.surname,f.value.email,f.value.phone,f.value.address,this.skillIDs).subscribe(r=>{
        if(r.upserted)
          this.snackBar.open("Success",null,{duration:1000,horizontalPosition:'right',verticalPosition:'top',panelClass:['snack-success']});
        else
          this.snackBar.open("Error",null,{duration:1000,horizontalPosition:'right',verticalPosition:'top',panelClass:['snack-error']});
      },err=>{
        console.error(err);
        this.snackBar.open("Error",null,{duration:1000,horizontalPosition:'right',verticalPosition:'top',panelClass:['snack-error']});
      })
    },err=>{
      console.error(err);
      this.snackBar.open("Error",null,{duration:1000,horizontalPosition:'right',verticalPosition:'top',panelClass:['snack-error']});
    })
  }


}
