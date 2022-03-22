const  collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

const createCollege = async function(req, res){
    try{
        const CollegeDetails = req.body
        const name = CollegeDetails.name
        const fullName = CollegeDetails.fullName
        // const logoLink = internDetails.logoLink
        if (Object.entries(CollegeDetails).length === 0) {
            res.status(400).send({ status: false, msg: "please provide college details." })}
        if (!name){return res.status(400).send({status:false, msg:"please provide the name of college."})}
        if (!fullName){return res.status(400).send({status:false, msg:"please provide the full name of the college."})}
        // if (!logoLink){return res.status(400).send({status:false, msg:"please provide the logo link."})}
        const saveDetails = await collegeModel.create(CollegeDetails)
        res.status(201).send({status:true, msg:"Collage Details stored successfully", data:saveDetails})
    }
    catch(err){return res.status(500).send({status:false, msg:err.message})}
}

const createIntern = async function(req, res){
    try{
        const internDetails = req.body
        const name = internDetails.name
        const email = internDetails.email
        const mobile = internDetails.mobile
        const collegeId = internDetails.collegeId
        if (Object.entries(internDetails).length === 0) {
            res.status(400).send({ status: false, msg: "please provide intern details." })}
        if (!name){return res.status(400).send({status:false, msg:"please provide the name of intern."})}
        if (!email){return res.status(400).send({status:false, msg:"please provide the email."})}
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            return res.status(400).send({status:false,msg:"please provide valid email"})
        }
        if (!collegeId){return res.status(400).send({status:false, msg:"please provide the college Id."})}
        if (!mobile){return res.status(400).send({status:false, msg:"please provide the mobile number."})}
        if(!(/^(?!0+$)(\+\d{1,3}[- ]?)?(?!0+$)\d{10}$/.test(mobile))){
            return res.status(400).send({status:false,msg:"please provide valid mobile number"})
        }
        const validCollegeId = await collegeModel.findById(collegeId)
        if(!validCollegeId){return res.status(400).send({status:false,msg:"Invalid College Id"})}
        const saveDetails = await internModel.create(internDetails)
        res.status(201).send({status:true, msg:"Intern Details stored successfully", data:saveDetails})
    }
    catch(err){return res.status(500).send({status:false, msg:err.message})}
}                      

const getCollegeDetails = async function(req, res){
    try{
        const collegeName = req.query.collegeName
        if (!collegeName){return res.status(400).send({status:false, msg:"please provide college name."})}
        const findCollege = await collegeModel.findOne({name:collegeName, isDeleted:false})
        if (!findCollege){
            return res.status(404).send({status:false, msg:"no college found with the provided college name."})}
        const collegeId = findCollege._id
        const allInterns = await internModel.find({collegeId:collegeId}).select({name:1, email:1, mobile:1})
        if(allInterns.length == 0){
            return res.status(404).send({status:false, msg:"no Intern found with the provided college name."})}
        const finalCollegeData = {
            name : findCollege.name,
            fullName : findCollege.fullName,
            interests : allInterns
        }
        res.status(200).send({status:true, data:finalCollegeData})
    }
    catch(err){return res.status(500).send({status:false, msg:err.message})}
}

module.exports.createIntern = createIntern;
module.exports.createCollege = createCollege;
m