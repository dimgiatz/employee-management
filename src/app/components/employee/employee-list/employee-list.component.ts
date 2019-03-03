import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees:any;
  sortBy:string="surname";
  sortOrder:any="1";
  length = 0;
  pageSize = 10;
  pageIndex=0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  searchText: string="";
  delay:any;

  constructor(private data:DataService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.data.getEmployees(this.searchText,{[this.sortBy]:parseInt(this.sortOrder)},this.pageSize,this.pageIndex+1).subscribe(c=>{
      this.employees=c.results;
      this.length=c.count;
    },e=>{console.log(e)});
  }

  search(){
    if(this.delay){
      clearTimeout(this.delay);
    }
    this.delay=setTimeout(()=>{
      this.delay=null;
      this.data.getEmployees(this.searchText,{[this.sortBy]:parseInt(this.sortOrder)},this.pageSize,this.pageIndex+1).subscribe(c=>{
        this.employees=c.results;
        this.length=c.count;
      },e=>{console.log(e)});
    },500);
  }

  changePage(pageSize,pageIndex){
    this.pageSize=pageSize;
    this.pageIndex=pageIndex;
    this.search();
  }

  deleteEmployees(employee){
    if(confirm("Are you sure to delete "+employee.name)){
      this.data.deleteEmployees(employee._id).subscribe(r=>{
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
