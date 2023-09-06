

const getAllJobs = async (req, res) => {
    res.send('Get all Jobs')
}

const getJob = async (req, res) => {
    res.send('Get a Job')
}

const createJob = async (req, res) => {
    res.send('Create a Job')
}


const updateJob = async (req, res) => {
    res.send('Update a job')
}

const deleteJob = async (req, res) => {
    res.send('Delete a job')
}



module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}