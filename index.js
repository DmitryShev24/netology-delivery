const express = require("express"),
    app = express(),
    routes = require("./routes/api/delivery");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");



const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = process.env.DB_NAME || 'books'
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/'

//console.log('test', process.env.PORT)
console.log(UserDB)
console.log(PasswordDB)
console.log(NameDB)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes);



async function start() {
    try {
        //const UrlDB = `mongodb+srv://${UserDB}:${PasswordDB}@cluster0.grfrs.mongodb.net/${NameDB}`;
        //const UrlDB = `mongodb://localhost:27017/mydb`;
        //const UrlDB = `mongodb://${UserDB}:${PasswordDB}@localhost:27017/mydb`;
        //await mongoose.connect(UrlDb);

        await mongoose.connect(HostDb, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        },() => {
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            })
        });


    } catch (e) {
        console.log(e);
    }
}

start();