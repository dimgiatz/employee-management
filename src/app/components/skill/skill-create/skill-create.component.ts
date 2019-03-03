import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-skill-create',
  templateUrl: './skill-create.component.html',
  styleUrls: ['./skill-create.component.scss']
})
export class SkillCreateComponent implements OnInit {

  constructor(private data:DataService,private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onYesClick(f:NgForm){
    this.data.createSkill(f.value.name,f.value.description).subscribe(r=>{
      if(r.upserted)
        this.snackBar.open("Success",null,{duration:1000,horizontalPosition:'right',verticalPosition:'top',panelClass:['snack-success']});
      else
        this.snackBar.open("Error",null,{duration:1000,horizontalPosition:'right',verticalPosition:'top',panelClass:['snack-error']});
    },err=>{
      console.error(err);
      this.snackBar.open("Error",null,{duration:1000,horizontalPosition:'right',verticalPosition:'top',panelClass:['snack-error']});
    })
  }

}
