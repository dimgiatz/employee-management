const Employee = require("../models/employee");

exports.employeeUpsert=(req,res)=>{
    query={$and:[{email:req.body.email},{name:req.body.name}, {surname:req.body.surname}, {phone:req.body.phone}, {address:req.body.address}, {skills:req.body.skills}]};
    update= {skills:req.body.skills};
    Employee.employeeUpsert(query,update,(status,message)=>{
        res.status(status).json(message);
    });
}

exports.employeeSearch=(req,res)=>{
    Employee.employeeSearch({$or:[{name:{$regex:req.body.search,$options:'i'}},{surname:{$regex:req.body.search,$options:'i'}}]}, req.body.sort, parseInt(req.body.pageSize), parseInt(req.body.page), (status,message)=>{
        res.status(status).json(message);
    });
}

exports.employeeDelete=(req,res)=>{
    Employee.employeeDelete(req.body.id, (status,message)=>{
        res.status(status).json(message);
    });
}

exports.getEmployeeById=(req,res)=>{
    Employee.getEmployeeById(req.body.id, (status,message)=>{
        res.status(status).json(message);
    });
}

exports.updateEmployee=(req,res)=>{
    req.body.update['updatedAt']=Date.now();
    Employee.updateEmployee(req.body.id,req.body.update, (status,message)=>{
        res.status(status).json(message);
    });
}