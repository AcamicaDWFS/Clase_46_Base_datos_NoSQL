const mongoose = require('./conexionShop.js');
const express = require('express');
const faker = require('faker');
/* const app = express(); */

/* app.listen(3000, function () {
    console.log('listening on 3000')
})
 */

const users = mongoose.model('users', {
    id: Number,
    name: String,
    lastName: String,
    email: String,
    userName: String,
    country: String,
    age: Number,
    active: Boolean,
    creationDate: Date
    //phone: String,
    //companyName: String
});

for (let index = 1; index <= 100; index += 1) {

    const randomName = faker.name.findName();
    const randomLastName = faker.name.lastName();
    const randomEmail = faker.internet.email();
    const randomUserName = faker.internet.userName();
    const randomCountry = faker.address.country();
    const randomAge = Math.floor(Math.random() * 60) + 20;
    const randomActive = faker.random.boolean();
    const randomCreationDate = faker.date.past();
    //const randomPhone = faker.phone.phoneNumber();
    //const randomCompanyName = faker.company.companyName();

    let newUser = {
        id: index,
        name: randomName,
        lastName: randomLastName,
        email: randomEmail,
        userName: randomUserName,
        country: randomCountry,
        age: randomAge,
        active: randomActive,
        creationDate: randomCreationDate
        //  phone: randomPhone,
        //  companyName: randomCompanyName
    };

    console.log(newUser);

    const user = new users(newUser);
    user.save();
}


