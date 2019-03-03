const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email:{ type: String, unique:true },
    phone:{ type: String },
    address:{ type: String },
    skills:[{ type: mongoose.Schema.Types.ObjectId, ref: "Skill"}],
    updatedAt:{ type: Date, default: Date.now },
    hiredAt:{ type: Date, default: Date.now } 
});

//Employee Model
var Employee= module.exports = mongoose.model("Employee", employeeSchema);

module.exports.employeeUpsert=(query,update,callback)=>{
    let options = {
        upsert: true,
        setDefaultsOnInsert: true,
        strict:false
    };

    Employee.updateOne(query,update,options,(err,r)=>{
        if (err){
            callback(500,err);
        }
        else{
            callback(200,r);
        }
    })
}

module.exports.employeeSearch=(filters, sort, pageSize, page, callback)=>{

    let Query=Employee.find(filters);

    Query.countDocuments((err,count)=>{
        if(err){
            callback(500,{
                error:err
            });
        }
        else{
            Employee.find(filters)
            .skip(pageSize*(page-1))
            .limit(pageSize)
            .sort(sort)
            .populate({ path:"skills"})
            .exec((err,results)=>{
                if (err){
                    callback(500,{
                        error:err
                    });
                }
                else{
                    callback(200,{
                        results:results,
                        count:count
                    });
                }
            });
        }
    });
}

module.exports.employeeDelete=(id,callback)=>{
    Employee.findByIdAndDelete(id,{},(err,results)=>{
        if (err){
            callback(500,{
                error:err
            });
        }
        else{
            callback(200,{
                results:results
            });
        }
    })
}

module.exports.updateEmployee=(id,update,callback)=>{
    Employee.findByIdAndUpdate(id,update,(err,results)=>{
        if (err){
            callback(500,{
                error:err
            });
        }
        else{
            callback(200,{
                results:results
            });
        }
    })
}

module.exports.getEmployeeById=(id,callback)=>{
    Employee.findById(id,{},(err,results)=>{
        if (err){
            callback(500,{
                error:err
            });
        }
        else{
            callback(200,{
                results:results
            });
        }
    })
}