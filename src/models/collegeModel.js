const mongoose = require('mongoose');


const CollegeSchema = new mongoose.Schema( {
    name:{
        type:String,
        required:true,
        trim: true,
        unique : true
    },
    fullName:{
        type:String,
        required:true,
        trim: true
    },
    logoLink:{
        type:String,
        trim: true,
        required : true
    },
    isDeleted:{type:Boolean, default: false} 
}, { timestamps: true });

module.exports = mongoose.model('CollegeDetail', CollegeSchema)
