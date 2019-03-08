import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SkillCreateComponent } from './components/skill/skill-create/skill-create.component';
import { SkillListComponent } from './components/skill/skill-list/skill-list.component';
import { SkillEditComponent } from './components/skill/skill-edit/skill-edit.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';

const appRoutes: Routes = [
    { path: 'view', component: DashboardComponent, children:[
         { path: 'employees', component: EmployeeListComponent },
         { path: 'employee/create', component: CreateEmployeeComponent},
         { path: 'employee/edit/:id', component: EmployeeEditComponent, pathMatch: 'full' },
         { path: 'skill/edit/:id', component: SkillEditComponent, pathMatch: 'full' },
         { path: 'skill/create', component: SkillCreateComponent },
         { path: 'skills', component: SkillListComponent }
    ] },
    { path: '', component: DashboardComponent},
    { path: '**', component: DashboardComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { enableTracing: false })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
