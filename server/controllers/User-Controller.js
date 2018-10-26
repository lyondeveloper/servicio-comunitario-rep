const User = require('../models/User-Model');
const _ = require('underscore');
const bcrypt = require('bcryptjs');

class UserController {

    create(req, res) {

        let user = new User({

            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            role: req.body.role,
            online: req.body.online,
            birthday: req.body.birthday,
            identification: req.body.identification
    
        });
    
        user.save((err, userSaved) => {
    
            if (err) {
    
                return res.status(500).json({
    
                    ok: false,
                    err,
                    message: "Error saving the user to the data base"
    
                });
    
            }
    
            res.json({
    
                ok: true,
                userSaved
    
            });
        });

    }

    getAll(req, res) {

        let from = req.query.from;
        from = Number(from);

        let limit = req.query.limit;
        limit = Number(limit);

        User.find({})
            .skip(from)
            .limit(limit)
            .sort("name")
            .exec((err, users) => {

                if (err) {

                    return res.status(500).json({

                        ok: false,
                        err,
                        
                    });

                }

                if (users.length === 0) {

                    return res.status(400).json({

                        ok: false,
                        message: "Maybe there isn't users registered in the database"

                    });

                }

                User.count((err, count) => {

                    res.json({

                        ok: true,
                        users,
                        count

                    });
                });
            });

    }

    getByName(req, res) {

        let name = req.params.name;

        let regexp = new RegExp(name, "i")

        User.findOne({name: regexp}, (err, user) => {

            if (err) {

                return res.status(500).json({

                    ok: false,
                    err

                });

            }

            if (!user) {

                return res.status(401).json({

                    ok: false,
                    message: "Maybe the user doesn't exist in the database"

                });

            }
            
            res.json({

                ok: true,
                user

            });

        });

    }

    getByIdentification(req, res) {

        let identification = req.params.identification;

        User.findOne({identification}, (err, user) => {

            if (err) {

                return res.status(500).json({

                    ok: false,
                    err

                });

            }

            if (!user) {

                return res.status(400).json({

                    ok: false,
                    message: "Maybe, the user doesn't exist"

                });

            }  

            res.json({

                ok: true,
                user
            
            });

        });

    }

    update(req, res) {

        let id = req.params.id;

        let body = _.pick(req.body, ['online']);

        User.findOneAndUpdate({_id: id}, body, {new: true}, (err, userUpdated) => {

            if (err) {

                return res.status(500).json({

                    ok: false,
                    err

                });

            }

            if (!userUpdated) {

                return res.status(400).json({

                    ok: false,
                    message: "Maybe this user doesn't exist"

                });

            }
            
            res.json({

                userUpdated

            });

        });

    }

    delete(req, res) {

        let id = req.params.id;

        User.findByIdAndRemove(id, (err, userDeleted) => {

            if (err) {

                return res.status(500).json({

                    ok: false,
                    err

                });

            }

            if (!userDeleted) {

                return res.status(400).json({

                    ok: false,
                    message: "Maybe the user you want to delete, doesn't exist"

                });

            }

            res.json({

                ok: true,
                userDeleted

            });
            
        });

    }

}

var userController = new UserController();

module.exports = userController;