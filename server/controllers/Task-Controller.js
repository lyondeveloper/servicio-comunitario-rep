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

    get(req, res) {

        Task
        .find()
        .populate('user', 'name')
        .sort('description')
        .exec((err, task) => {

            if (err) {

                return res.status(500).json({

                    ok: false,
                    err

                });

            }

            if (!task) {

                return res.status(500).json({

                    ok: false,
                    message: "Maybe the task doesn't exist"

                });

            }

            Task.count((err, count) => {

                res.json({
    
                    ok: true,
                    task,
                    count
                
                });

            });

        });

    }
  
    getByDescription(req, res) {

        let description = req.params.description;
        let regexp = new RegExp(description, 'i');

        Task.find({description: regexp})
            .populate('user', 'name')
            .exec((err, task) => {

            if (err) {

                return res.status(500).json({

                    ok: false,
                    err

                });

            } 

            if (!task) {

                return res.status(401).json({

                    ok: false,
                    message: "Maybe the task doesn't exist or is completed"

                }); 

            }   

            res.json({

                ok: true,
                task

            });
 
        });

    }

    update(req, res) {

        let id = req.params.id;

        let newBody = _.pick(req.body, ['description', 'completed']);

        Task.findByIdAndUpdate(id, newBody, {new: true}, (err, taskUpdated) => {

            if (err) {

                return res.status(500).json({

                    ok: false,
                    err

                });

            }

            if (!taskUpdated) {

                return res.status(400).json({

                    ok: false,
                    message: "The task you want to update doesn't exist"
                    
                });

            }

            res.json({

                ok: true,
                taskUpdated

            });

        });

    }

    
    delete(req, res) {

        let id = req.params.id;

        Task.findByIdAndDelete(id, (err, taskDeleted) => {

            if (err) {

                return res.status(500).json({

                    ok: false,
                    err

                });

            }

            if (!taskDeleted) {

                return res.status(400).json({

                    ok: false,
                    message: "Maybe the task doesn't exist"

                });

            }
 
            res.json({

                ok: true,
                taskDeleted

            });

        });

    }

}

var taskController = new TaskController();

module.exports = taskController;