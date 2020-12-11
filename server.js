const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const Tour = require('./Model/tourModel');
const os = require('os');
const osType = os.type();

console.log(osType);

dotenv.config({ path:'./config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("DB connection successful!"));

const Testtour = new Tour({
    name: "The Forest Hiker",
    rating: 4.7,
    price: 497
});

Testtour
    .save()
    .then(doc => console.log(doc))
    .catch(err => console.log("ERROR : ", err))

const PORT = process.env.PORT||3000;
app.listen(3000, ()=>{
    console.log(`App running on port : ${PORT}`)
})
