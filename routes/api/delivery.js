const express = require("express")
const router = express.Router()

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const User = require("../../models/user")
const Advertisement = require("../../models/advertisement")

const mongoose = require('mongoose');

const UsersModule = require('../../modules/usersModule');



//Регистрация
router.post("/signup",  async(req, res) => {
    if (req.user) { // Can't create user, if signed IN
        res.status(400).json({
            "reply": "Please, log out first",
            "status": "error"
        })
    } else {

        const newUser = await UsersModule.create(req.body);
        if (newUser) {
            res.status(200).json({
                data: getUserData(newUser),
                status: "ok"
            });
        } else {
            res.status(500).json({
                error: "Не удалось зарегистрировать пользователя",
                status: "error"
            });
        }
    }

    // try {
    //     const {email, password, name, contactPhone, someId} = req.body
    //     const salt = bcrypt.genSaltSync(saltRounds);
    //     const hash = bcrypt.hashSync(password, salt);
    //
    //     console.log(email, password, name, contactPhone, someId)
    // //     const id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
    // //     const newUser = new User({
    // //         _id: id,
    // //         email: email,
    // //         passwordHash: hash,
    // //         name: name,
    // //         contactPhone: contactPhone
    // // })
    //     const user = await UsersModule.create(data);
    //     // await newUser.save();
    //     //     res.status(201)
    //     //     res.json(newUser);
    //     if (newUser) {
    //         res.status(200).json({
    //             data: getUserData(newUser),
    //             status: "ok"
    //         });
    //     } else {
    //         res.status(500).json({
    //             error: "Не удалось зарегистрировать пользователя",
    //             status: "error"
    //         });
    //     }
    //     // try {
    //     //     await newBook.save();
    //     //     res.status(201)
    //     //     res.json(newBook);
    //     // } catch (e) {
    //     //     console.error(e);
    //     //     res.status(500).json();
    //     // }
    //
    // } catch (e) {
    //     console.error(e);
    //     res.status(404).json("advertisement not found");
    // }

});

function getUserData(user) {
    const {_id, email, name, contactPhone} = user;
    return {
        _id,
        email,
        name,
        contactPhone: (contactPhone === undefined)? "not defined": contactPhone,
    }
}

//Аутентификация
// router.post("/signin", async (req, res) => {
//
//     const newUser = new User({
//         email: "kulagin@netology.ru",
//         password: "ad service",
//         name: "Alex Kulagin",
//         contactPhone: "+7 123 456 78 90"
//     })
//     res.json(newUser);
// });

//Просмотр объявлений
router.get("/advertisements", async (req, res) => {

    const advertisements = await Advertisement;
    res.json(advertisements);
});

//Просмотр конкретного объявления
router.get("/advertisements/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const advertisement = await Advertisement.findById(id);
        res.json(advertisement);
    } catch (e){
        console.error(e);
        res.status(404).json("advertisement not found");
    }

});

//Получить список объявлений
router.post("/advertisements", async (req, res) => {

    const newAdvertisement = new Advertisement({
        shortTitle: "Продам слона",
        description: "kulagin@netology.ru",
        images: [
            "/uploads/507f1f77bcf86cd799439011/slon_v_profil.jpg",
            "/uploads/507f1f77bcf86cd799439011/slon_v_fas.jpg",
            "/uploads/507f1f77bcf86cd799439011/slon_hobot.jpg"
        ],
        user: {
            "id": "507f1f77bcf86cd799439011",
            "name": "Alex Kulagin"
        },
        createdAt: "2020-12-12T10:00:00.000Z"

    })
    res.json(newAdvertisement);
});

//Удаление объявления
router.delete('/advertisements/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await Advertisement.deleteOne({_id: id});
        res.json(true);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }

});

module.exports = router