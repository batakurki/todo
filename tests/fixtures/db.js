const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Ravi1',
    email: 'ravi1@email.com',
    password: 'Ravi1@123',
    tokens : [{
        token: jwt.sign({ _id : userOneId } , 'thisisnodejscourse')
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Ravi2',
    email: 'ravi2@email.com',
    password: 'Ravi2@123',
    tokens : [{
        token: jwt.sign({ _id : userTwoId } , 'thisisnodejscourse')
    }]
}

const taskOne = {
    _id : new mongoose.Types.ObjectId,
    description : 'Task 1',
    completed : false,
    owner : userOne._id
}

const taskTwo = {
    _id : new mongoose.Types.ObjectId,
    description : 'Task 2',
    completed : true,
    owner : userOne._id
}

const taskThree = {
    _id : new mongoose.Types.ObjectId,
    description : 'Task 3',
    completed : false,
    owner : userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}