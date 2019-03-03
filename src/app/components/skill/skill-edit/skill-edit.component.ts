import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.scss']
})
export class SkillEditComponent implements OnInit {

  @ViewChild('f') f: NgForm;
  sid: any;
  showPage:boolean=false;
  skill: any;

  constructor(private data:DataService,private snackBar: MatSnackBar,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(r=>{
      this.sid=r.id;
    });

    this.data.getSkillById(this.sid).subscribe(c=>{
      this.skill=c.results;
      if(this.skill){
        this.skill.createdAt=moment(new Date(this.skill.createdAt), 'YYYY-MM-DDTHH:mm:ss+-HH:mm:ss').toDate().toLocaleString();
        this.skill.updatedAt=moment(new Date(this.skill.updatedAt), 'YYYY-MM-DDTHH:mm:ss+-HH:mm:ss').toDate().toLocaleString();
      }
      this.showPage=true;
    },e=>{console.error(e)});
  }

  onYesClick(f:NgForm){
    this.data.updateSkill(this.sid,f.form.value).subscribe(d=>{
      if(d.results)
        this.snackBar.open("Επεξεργασία Επιτυχής",null,{duration:1000,horizontalPosition:'right',verticalPosition:'top',panelClass:['snack-success']})
   },e=>{
     this.snackBar.open("Ανεπιτυχής Ενέργεια",null,{duration:1000,horizontalPosition:'right',verticalPosition:'top',panelClass:['snack-error']});
     console.log(e);
    });
  }

  

}
