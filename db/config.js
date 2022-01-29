const mongoose = require('mongoose');

const dbConnection = async() => {

    try{//TODO: remove this (only for first night execution)
        await mongoose.connect( process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Successfully connected to database');

    }catch(error){
        console.log(error);
        throw new Error("Error in database connection");
    }

};

module.exports = {
    dbConnection
};