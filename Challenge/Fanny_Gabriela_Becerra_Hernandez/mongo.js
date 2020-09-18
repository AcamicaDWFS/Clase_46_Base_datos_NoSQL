let mongoose = require('mongoose'),
    kittySchema = new mongoose.Schema({ name: String }),
    Cat = mongoose.model('Cat', kittySchema, 'myCats'),
    cats = []

require('dotenv').config();
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@acamica.s5rtw.mongodb.net/test`, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Connection Successful!"));

let artemisa = new Cat({ name: 'Artemisa' }),
    apolita = new Cat({ name: 'Apolita' }),
    zeus = new Cat({ name: 'Zeus' }),
    minerva = new Cat({ name: 'Minerva' }),
    hades = new Cat({ name: 'Hades' }),
    geminis = new Cat({ name: 'Géminis' }),
    venus = new Cat({ name: 'Venus' });

cats.push(artemisa);
cats.push(apolita);
cats.push(zeus);
cats.push(minerva);
cats.push(hades);
cats.push(geminis);
cats.push(venus);

for (cat of cats) {
    cat.save((err, doc) => {
        err ? console.error(err) : console.log('¡El gatito encontró un nuevo hogar!');
    });
}