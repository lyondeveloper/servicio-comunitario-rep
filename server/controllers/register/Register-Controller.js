const Student = require('../../models/register/Student-Model');
const Parent = require('../../models/register/Parent-Model');
const Represent = require('../../models/register/Represent-Model');
const _ = require('underscore');
const bcrypt = require('bcryptjs');

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

            representAndParent: [
                
                new Represent({

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
        
                new Parent({

                    name: body.parentName

                })

            ]

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

}

var registerController = new RegisterController();

module.exports = registerController;