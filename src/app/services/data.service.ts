import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class DataService {

    constructor(private http: HttpClient) { }
    
    createSkill(name,description){
        return this.http.post<any>('/api/skill/upsert',
            {
            "name":name,
            "description":description
            }
        )
    }

    createEmployee(name,surname,email,phone,address,skillIds){
        return this.http.post<any>('/api/employee/upsert',
            {
            "name":name,
            "surname":surname,
            "phone":phone,
            "address":address,
            "email":email,
            "skills":skillIds
            }
        )
    }

    getSkills(searchText,sort,pageSize,page){
        return this.http.post<any>('/api/skill/search',{
            "search":searchText,
            "sort":sort,
            "pageSize":pageSize,
            "page":page
        })
    }

    getEmployees(searchText,sort,pageSize,page){
        return this.http.post<any>('/api/employee/search',{
            "search":searchText,
            "sort":sort,
            "pageSize":pageSize,
            "page":page
        })
    }

    deleteSkills(id){
        return this.http.post<any>('/api/skill/delete',{
            id:id
        })
    }

    deleteEmployees(id){
        return this.http.post<any>('/api/employee/delete',{
            id:id
        })
    }

    getSkillById(id){
        return this.http.post<any>('/api/skill/get',{
            id:id
        })
    }

    getEmployeeById(id){
        return this.http.post<any>('/api/employee/get',{
            id:id
        })
    }

    updateSkill(id,update){
        return this.http.post<any>('/api/skill/update',{
            id:id,
            update:update
        })
    }

    updateEmployee(id,update){
        return this.http.post<any>('/api/employee/update',{
            id:id,
            update:update
        })
    }

    upsertSkills(names){
        return this.http.post<any>('/api/skill/upserts',{
            query:names
        })
    }

  }