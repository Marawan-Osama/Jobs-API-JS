const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')


const getAllJobs = async (req, res) => {
    const job = await Job.find({createdBy:req.user.userID}).sort('createdAt')
    res.status(StatusCodes.OK).json({job, count:job.length})
}

const getJob = async (req, res) => {
    const job = await Job.findOne({_id:req.params.id, createdBy:req.user.userID})
    if(!job){
        throw new NotFoundError(`No job with id ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req, res) => {
  const job = await Job.create({...req.body, createdBy: req.user.userID})
  res.status(StatusCodes.CREATED).json({ job })
}


const updateJob = async (req, res) => {
    
    if(req.body.company === "" || req.body.position === "" ){
        throw new BadRequestError("Company or Position cannot be empty")
    }
    
    const job = await Job.findOneAndUpdate({_id:req.params.id, createdBy:req.user.userID}, req.body, {
        new:true,
        runValidators:true,
    })
    if(!job){
        throw new NotFoundError(`No job with id ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const deleteJob = async (req, res) => {
    const job = await Job.findByIdAndRemove({_id:req.params.id, createdBy:req.user.userID})
    if(!job){
        throw new NotFoundError(`No job with id ${req.params.id}`)
    }
    res.status(StatusCodes.OK).send()
}



module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}