const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const ObjectId= mongoose.Schema.Types.ObjectId


const  internSchema = new mongoose.Schema({
    name: { type: String, required: true,trim :true },
    email: { type: String, required: true ,unique:true,trim:true,lowercase:true},
    mobile :{ type: String, required: true, unique :true,trim :true },
    collegeId: { type:ObjectId,  ref:"CollegeDetail"  },
    isDeleted: { type:Boolean, default: false }
},{ timestamps: true });

module.exports = mongoose.model('InternDetail', internSchema)
