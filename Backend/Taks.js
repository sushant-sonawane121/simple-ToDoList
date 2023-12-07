const mongoose = require('mongoose');

const Taks = mongoose.Schema({
    Title:{
        "type":String,
        "required":true
    },
    Description:{
        "type":String,
        "required":true
    }
});

const Task = mongoose.model('Taks',Taks);

module.exports = Task;