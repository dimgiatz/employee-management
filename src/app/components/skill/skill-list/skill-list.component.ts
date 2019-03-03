import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {

  skills:any;
  length = 0;
  pageSize = 10;
  pageIndex=0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  searchText: string="";
  delay:any;

  constructor(private data:DataService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.data.getSkills(this.searchText,{},this.pageSize,this.pageIndex+1).subscribe(c=>{
      this.skills=c.results;
      this.length=c.count;
      console.log(this.skills);
    },e=>{console.log(e)});
  }

  search(){
    if(this.delay){
      clearTimeout(this.delay);
    }
    this.delay=setTimeout(()=>{
      this.delay=null;
      this.data.getSkills(this.searchText,{},this.pageSize,this.pageIndex+1).subscribe(c=>{
        this.skills=c.results;
        this.length=c.count;
      },e=>{console.log(e)});
    },500);
  }

  pageChanges(pageSize,pageIndex){
    this.pageSize=pageSize;
    this.pageIndex=pageIndex;
    this.search();
  }

  deleteSkills(skill){
    if(confirm("Are you sure to delete "+skill.name)){
      this.data.deleteSkills(skill._id).subscribe(r=>{
        if (r.results){
          this.snackBar.open("Success",null,{duration:1000,horizontalPosition:'right',verticalPosition:'top',panelClass:['snack-success']});
          this.search()
        }else{
          this.snackBar.open("Error",null,{duration:1000,horizontalPosition:'right',verticalPosition:'top',panelClass:['snack-error']});
        }
      },err=>{
        console.error(err);
        this.snackBar.open("Error",null,{duration:1000,horizontalPosition:'right',verticalPosition:'top',panelClass:['snack-error']});
      });
    }
  }

}
