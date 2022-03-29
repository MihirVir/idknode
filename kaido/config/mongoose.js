const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kaido_dev');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error ew'));
db.once('open', function(){
    console.log('successfully connected to the database');
})
module.exports = db;