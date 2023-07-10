const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const FriendModel = require('./models/Friends')

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/tutorialmern')

app.post('/addfriend', async (req, res) => {
    const name = req.body.name;
    const age = req.body.age;

    const friend = new FriendModel({ name: name, age: age })
    await friend.save()
    res.send(friend)
})

app.get('/read', (req, res) => {
    FriendModel.find({})
        .then((data) => res.send(data))
        .catch(err => console.log(err))
})

app.put('/update', async (req, res) => {
    const newAge = req.body.newAge;
    const id = req.body.id;

    try {
        const userFound = await FriendModel.findById(id);
        userFound.age = newAge;
        userFound.save();
    } catch (err) {
        console.log(err);
    }

    res.send("Updated friend")
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await FriendModel.findByIdAndDelete(id).exec();
    res.send("Deleted friend")
})

app.listen(3001, () => {
    console.log('You are connected ');
})