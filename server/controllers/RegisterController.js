const Student = require('../models/register/Student');
const Parent = require('../models/register/Parent');
const Represent = require('../models/register/Represent');
const _ = require('underscore');

class RegisterController {

    create(req, res) {

        let body = req.body;        

        let student = new Student({

            name: body.name,
            identification: body.identification,
            sex: body.sex,
            birthday: body.birthday,
            birthdayPlace: body.birthdayPlace,
            municipality: body.municipality,
            country: body.country,
            age: body.age,
            weight: body.weight,
            height: body.height,
            shirtSize: body.shirtSize,
            pantSize: body.pantSize,
            shoeSize: body.shoeSize,
            liveWithParents: body.liveWithParents,
            direction: body.direction,
            phoneNumber: body.phoneNumber,
            impedimentToSports: body.impedimentToSports,
            alergicTo: body.alergicTo,

            represent: new Represent({

                name: body.representName,
                sex: body.representSex,
                identification: body.representID,
                birthday: body.representBirthday,
                age: body.representAge,
                civilState: body.representCivilState,
                ocupation: body.representOcupation,
                company: body.representCompany,
                direction: body.representDirection,
                phoneNumber1: body.representPhoneNumber1,
                phoneNumber2: body.representPhoneNumber2,

            }),
        
            parent: new Parent({

                name: body.parentName,
                sex: body.parentSex,
                identification: body.parentIdentification,
                birthday: body.parentBirthday,
                company: body.parentCompany,
                civilState: body.parentCivilState,
                ocupation: body.parentOcupation,
                direction: body.parentDirection,
                phoneNumber1: body.parentPhoneNumber1,
                phoneNumber2: body.parentPhoneNumber2,
                liveWithKid: body.liveWithKid

            })
        });

        student.save((err, student) => {

            if (err) {

                return res.status(500).json({

                    ok: false,
                    err

                });

            }

            res.json({

                ok: true,
                student

            });

        });

    }

    getAll(req, res) {

        let from = req.query.from;
        from = Number(from);

        let limit = req.query.limit;
        limit = Number(limit);

        Student
        .find()
        .skip(from)
        .limit(limit)
        .sort('-name')
        .exec((err, students) => {

            if (err) {

                return res.status(500).json({

                    ok: false,
                    err

                });

            }

            if (!students) {

                return res.status(404).json({

                    ok: false,
                    message: "Maybe there are no students in the database"

                });

            }

            Student.count((err, count) => {

                res.json({

                    ok: true,
                    students,
                    count

                });

            })

        });

    }

    getAllByName(req, res) {

      let name = req.params.name;

      let regexp = new RegExp(name, 'i');

      Student
      .find({name: regexp})
      .sort('-name')
      .exec((error, students) => {

          if (error) {

              return res.status(500).json({

                  ok: false,
                  err

              });

          }

          if (!students) {

              return res.status(404).json({

                  ok: false,
                  message: "Maybe there are no students"

              });

          }

          res.json({

              ok: true,
              students

          });

      }); 

  } 

    getByName(req, res) {

        let name = req.params.name;

        let regexp = new RegExp(name, 'i');

        Student.findOne({name: regexp}, (error, student) => {

            if (error) {

                return res.status(500).json({

                    ok: false,
                    err

                });

            }

            if (!student) {

                return res.status(404).json({

                    ok: false,
                    message: "Maybe the student doesn't exist"

                });

            }
 
            res.json({

                ok: true,
                student

            });

        }); 

    } 

    getByIdentification(req, res) {

        let identification = req.params.identification;

        Student.findById(identification, (error, student) => {
            
            if (error) {

                return res.status(500).json({

                    ok: false,
                    error

                });

            }

            if (!student) {

                return res.status(404).json({

                    ok: false,
                    message: "Maybe the student doesn't exist"

                });

            }

            res.json({

                ok: true,
                student

            });

        });

    }

    update(req, res) {

        let id = req.params.id;
        let body = req.body;

        Student.findOneAndUpdate({_id: id}, body, {

            new: true,
            runValidators: true

        }, (error, student) => {

            if (error) {

                return res.status(500).json({

                    ok: false,
                    error

                });

            }

            if (!student) {

                return res.status(400).json({

                    ok: false,
                    message: "The student you want doesn't exist"

                });

            }

            //Student data
            student.name = body.name;
            student.identification = body.identification;
            student.sex = body.sex;
            student.birthday = body.birthday;
            student.birthdayPlace = body.birthdayPlace;
            student.municipality = body.municipality;
            student.country = body.country;
            student.age = body.age;
            student.weight = body.weight;
            student.height = body.height;
            student.shirtSize = body.shirtSize;
            student.pantSize = body.pantSize;
            student.shoeSize = body.shoeSize;
            student.liveWithParents = body.liveWithParents;
            student.direction = body.direction;
            student.phoneNumber = body.phoneNumber;
            student.impedimentToSports = body.impedimentToSports;
            student.alergicTo = body.alergicTo;

            //Represent data
            student.represent.name = body.representName;
            student.represent.sex = body.representSex;
            student.represent.identification = body.representID;
            student.represent.birthday = body.representBirthday;
            student.represent.age = body.representAge;
            student.represent.civilState = body.representCivilState;
            student.represent.ocupation = body.representOcupation;
            student.represent.company = body.representCompany;
            student.represent.direction = body.representDirection;
            student.represent.phoneNumber1 = body.representPhoneNumber1;
            student.represent.phoneNumber2 = body.representPhoneNumber2;
            
            //parent data
            student.parent.name = body.parentName
            student.parent.sex = body.parentSex
            student.parent.identification = body.parentIdentification
            student.parent.birthday = body.parentBirthday
            student.parent.company = body.parentCompany
            student.parent.civilState = body.parentCivilState
            student.parent.ocupation = body.parentOcupation
            student.parent.direction = body.parentDirection
            student.parent.phoneNumber1 = body.parentPhoneNumber1
            student.parent.phoneNumber2 = body.parentPhoneNumber2
            student.parent.liveWithKid = body.liveWithKid


            student.save((error, studentUpdated) => {

                if (error) {

                    return res.status(500).json({

                        ok: false,
                        error

                    });

                }

                res.json({

                    ok: true,
                    studentUpdated

                });

            });

        });

    }

    delete(req, res) {

        let id = req.params.id;

        Student.findOneAndDelete({_id: id}, (error, studentDeleted) => {

            if (error) {

                return res.status(500).json({

                    ok: false,
                    error

                });

            }

            if (!studentDeleted) {

                return res.status(404).json({

                    ok: false,
                    message: "Maybe the user you want to delete doesn't exist"

                });

            }

            res.json({

                ok: true,
                studentDeleted

            });

        });

    }

}

var registerController = new RegisterController();

module.exports = registerController;