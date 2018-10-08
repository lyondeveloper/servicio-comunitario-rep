const Task = require('../models/Task-Model');
const _ = require('underscore');
const User = require('../models/User-Model');

class TaskController {

    create(req, res) {
 
        let body = req.body;
        let user = req.user;

        let task = new Task({
            
            user: user._id,
            description: body.description,
            completed: body.completed
            
        });        
        
        User.findOneAndUpdate(user._id, {$push: {tasks: task}}, (err, userUpdated) => {

            if (err) {

                return res.status(400).json({

                    ok: false,
                    err

                });

            }
            
            task.save((err, task) => {
            
                if (err) {
                    
                    return res.status(500).json({
                        
                        ok: false,
                        err
                        
                    });
                    
                }

                res.json({

                    ok: true,
                    task,
                    userUpdated,
                    message: "Updated!"
    
                });
    
            });    

        });
                
    }   

}

var taskController = new TaskController();

module.exports = taskController;