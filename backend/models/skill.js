const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
    name: { type: String, required: true, unique:true },
    description: { type: String },
    updatedAt:{ type: Date, default: Date.now },
    createdAt:{ type: Date, default: Date.now } 
});

//Skill Model
var Skill= module.exports = mongoose.model("Skill", skillSchema);

module.exports.skillUpsert=(query,update,callback)=>{
    let options = {
        upsert: true,
        setDefaultsOnInsert: true
    };

    Skill.updateOne(query,update,options,(err,r)=>{
        if (err){
            callback(500,err);
        }
        else{
            callback(200,r);
        }
    })
}

module.exports.skillsUpsert=(query,update,callback)=>{
    let options = {
        upsert: true,
        setDefaultsOnInsert: true
    };

    return Skill.updateMany(query,update,options)
}

module.exports.skillSearch=(filters, sort, pageSize, page, callback)=>{

    let Query=Skill.find(filters);

    Query.countDocuments((err,count)=>{
        if(err){
            callback(500,{
                error:err
            });
        }
        else{
            Skill.find(filters)
            .skip(pageSize*(page-1))
            .limit(pageSize)
            .sort(sort)
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

module.exports.skillDelete=(id,callback)=>{
    Skill.findByIdAndDelete(id,{},(err,results)=>{
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

module.exports.updateSkill=(id,update,callback)=>{
    Skill.findByIdAndUpdate(id,update,(err,results)=>{
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

module.exports.getSkillById=(id,callback)=>{
    Skill.findById(id,{},(err,results)=>{
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