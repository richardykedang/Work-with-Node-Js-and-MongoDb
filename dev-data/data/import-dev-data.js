const fs = require('fs')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../Model/tourModel');

dotenv.config({ path:'./config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("DB connection successful!"));

//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

//IMPORT DATA INTO DB
const importData = async() => {
    try{

        await Tour.create(tours)
        console.log("Data succesfully loaded")
        
    } catch (err) {
        console.log(err)
    }
    process.exit()
}

const deleteData = async () => {
    try{

        await Tour.deleteMany();
        console.log("Data succesfully deleted");
        
    } catch (err) {
        console.log(err)
    }
    process.exit();
};

console.log(process.argv);
if(process.argv[2] == '--import') {
    importData();
} else if (process.argv[2] == '--delete') {
    deleteData();
}
