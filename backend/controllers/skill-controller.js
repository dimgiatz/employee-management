const Skill = require("../models/skill");

exports.skillUpsert=(req,res)=>{
    query={$and:[{name:req.body.name}, {description:req.body.description}]};
    update={};
    Skill.skillUpsert(query,update,(status,message)=>{
        res.status(status).json(message);
    });
}

exports.skillsUpsert=(req,res)=>{
    promises=Promise.all(req.body.query.map(c=>{
        return new Promise((resolve,reject)=>{
                Skill.skillsUpsert(c,{})
                .then(r=>{
                    resolve(r);
                    })
                .catch(err=>{
                    reject(err);
                })
            })
        })
    )

    promises.then(r=>{
        res.status(200).json(r)
    })
    .catch(err=>{
        res.status(500).json(err)
    })

}

exports.skillSearch=(req,res)=>{
    Skill.skillSearch({$or:[{name:{$regex:req.body.search,$options:'i'}},{description:{$regex:req.body.search,$options:'i'}}]}, req.body.sort, parseInt(req.body.pageSize), parseInt(req.body.page), (status,message)=>{
        res.status(status).json(message);
    });
}

exports.skillDelete=(req,res)=>{
    Skill.skillDelete(req.body.id, (status,message)=>{
        res.status(status).json(message);
    });
}

exports.getSkillById=(req,res)=>{
    Skill.getSkillById(req.body.id, (status,message)=>{
        res.status(status).json(message);
    });
}

exports.updateSkill=(req,res)=>{
    req.body.update['updatedAt']=Date.now();
    Skill.updateSkill(req.body.id,req.body.update, (status,message)=>{
        res.status(status).json(message);
    });
}