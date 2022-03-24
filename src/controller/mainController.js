const  collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

const createCollege = async function(req, res){
    try{
        const CollegeDetails = req.body
        const name = CollegeDetails.name
        const fullName = CollegeDetails.fullName
        const logoLink = CollegeDetails.logoLink
        if (Object.entries(CollegeDetails).length === 0) {
            res.status(400).send({ status: false, msg: "please provide college details." })}                  //checking coll. details presence
        if (!name){return res.status(400).send({status:false, msg:"please provide the name of college."})}    //checking college name presence
        const duplicateName = await collegeModel.findOne({name : name})
        if(duplicateName){return res.status(400).send({status:false, msg:"college already present."})}        // duplicate college name
        if (!fullName){return res.status(400).send({status:false, msg:"please provide the full name of the college."})}//checking fullname presence
        if (!logoLink){return res.status(400).send({status:false, msg:"please provide the logo link."})}        //checking logo link presence
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
            res.status(400).send({ status: false, msg: "please provide intern details." })}                  // intern details presence
        if (!name){return res.status(400).send({status:false, msg:"please provide the name of intern."})}    //checking name presence
        if (!email){return res.status(400).send({status:false, msg:"please provide the email."})}           // checking email presence
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            return res.status(400).send({status:false,msg:"please provide valid email"})}                  // for valid email id
        const duplicateEmail = await internModel.findOne({email : email})                       
        if(duplicateEmail){return res.status(400).send({status:false, msg:"Intern already present with the provided Email."})}// duplicate email
        if (!collegeId){return res.status(400).send({status:false, msg:"please provide the college Id."})}    // checking coll. id presence
        if (!mobile){return res.status(400).send({status:false, msg:"please provide the mobile number."})}    // checking mobile presence
        if(!(/^(?!0+$)(\+\d{1,3}[- ]?)?(?!0+$)\d{10}$/.test(mobile))){
            return res.status(400).send({status:false,msg:"please provide valid mobile number"})}              // for valid mobile number
        const duplicateMobile = await internModel.findOne({mobile : mobile})
        if(duplicateMobile){return res.status(400).send({status:false, msg:"Intern already present with the provided Mobile."})}//duplicate mobile
        const validCollegeId = await collegeModel.findById(collegeId)                                          
        if(!validCollegeId){return res.status(400).send({status:false,msg:"Invalid College Id"})}             // valid college id
        const saveDetails = await internModel.create(internDetails)
        res.status(201).send({status:true, msg:"Intern Details stored successfully", data:saveDetails})
    }
    catch(err){return res.status(500).send({status:false, msg:err.message})}
}               

const getCollegeDetails = async function(req, res){
    try{
        const collegeName = req.query.collegeName
        if (!collegeName){return res.status(400).send({status:false, msg:"please provide college name in query param."})}//checking coll. name presence
        const findCollege = await collegeModel.findOne({name:collegeName, isDeleted:false})                     // finding college in database
        if (!findCollege){
            return res.status(404).send({status:false, msg:"no college found with the provided college name."})}  
        const collegeId = findCollege._id
        const allInterns = await internModel.find({collegeId:collegeId, isDeleted:false}).select({name:1, email:1, mobile:1})  // finding intern in database
        if(allInterns.length == 0){
            return res.status(404).send({status:false, msg:"no Intern found with the provided college name."})}
        const finalCollegeData = {
            name : findCollege.name,
            fullName : findCollege.fullName,                                                             // creating new object and soring data
            logoLink : findCollege.logoLink,
            interests : allInterns
        }
        res.status(200).send({status:true, data:finalCollegeData})
    }
    catch(err){return res.status(500).send({status:false, msg:err.message})}
}

module.exports.createIntern = createIntern;
module.exports.createCollege = createCollege;
module.exports.getCollegeDetails = getCollegeDetails;

