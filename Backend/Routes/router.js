const express = require('express');
const router = express.Router();
const Users = require('../Models/User');

//Inserting(Creating) Data:
router.post("/add", async (req, res) => {
    const { firstName, lastName, email } = req.body;

    try {
        const pre = await Users.findOne({ email: email })
        console.log(pre);

        if (pre) {
            res.status(422).json("User is already added.")
        }
        else {
            const addUser = new Users({ firstName, lastName, email })

            await addUser.save();
            res.status(201).json(addUser)
            console.log(addUser)
        }
    }
    catch (err) {
        console.log(err)
    }
})

//Getting(Reading) Data:
router.get('/user', async (req, res) => {

    try {
        const getuser = await Users.find({})
        console.log(getuser);
        res.status(201).json(getuser);
    }
    catch (err) {
        console.log(err);
    }
})

//Getting(Reading) individual Data:
router.get('/user/:id', async (req, res) => {

    try {
        const getUser = await Users.findById(req.params.id);
        console.log(getUser);
        res.status(201).json(getUser);
    }
    catch (err) {
        console.log(err);
    }
})

//Editing(Updating) Data:
router.put('/user/:id', async (req, res) => {
    const { firstName, lastName, email } = req.body;

    try {
        const updateUser = await Users.findByIdAndUpdate(req.params.id, { firstName, lastName, email }, { new: true });
        console.log("Data Updated");
        res.status(201).json(updateUser);
    }
    catch (err) {
        console.log(err);
    }
})

//Deleting Data:
router.delete('/delete/:id', async (req, res) => {

    try {
        const deleteUser = await Users.findByIdAndDelete(req.params.id);
        console.log("Data Deleted");
        res.status(201).json(deleteUser);
    }
    catch (err) {
        console.log(err);
    }
})


module.exports = router;