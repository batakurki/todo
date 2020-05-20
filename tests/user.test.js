const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId , userOne , setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)


// Register / Create User test cases
// POST /users

test('Should signup a new user' , async () => {
    const response = await request(app).post('/users').send({
        name: 'Ravi',
        email: 'ravi@email.com',
        password: 'Ravi@123'
    }).expect(201)

    const user = await User.findById({ _id : response.body.user._id })

    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user : {
            name: 'Ravi',
            email: 'ravi@email.com'    
        },
        token : user.tokens[0].token
    })

    expect(user.password).not.toBe('Ravi1@123')
})

// Login User test cases
// POST /users/login

test('Should login existing user' , async () => {
    const response = await request(app).post('/users/login').send({
        email : userOne.email,
        password : userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)

})

test('Should NOT login non-existing user' , async () => {
    await request(app).post('/users/login').send({
        email : 'ravi1000@email.com',
        password : userOne.password
    }).expect(400)
})


// Read User test cases
// GET /users/me

test('Should get profile for the user' , async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should NOT get profile for unauthenticated user' , async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

// Delete User test cases
// DELETE /users/me

test('Should delete profile of the user' , async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should NOT delete profile of unauthenticated user' , async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

// Update User test cases
// PATCH /users/me

test('Should update valid user fields' , async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Ravi11'
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Ravi11')
})

test('Should NOT update invalid user fields' , async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Bengaluru'
        })
        .expect(404)
})
