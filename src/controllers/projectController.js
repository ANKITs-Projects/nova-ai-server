const Project = require("./../models/projectModel")

const createProject = async (req,res) => {
    try {
        const userId = req.user
        const {name, description} = req.body

        if(!name){
            res.status(400).json({
                message : "Project Name Is Required",
                success : false
            })
        }

        const project = new Project({
            name,
            description,
            user : userId
        })
        const data = await project.save()

        res.status(201).json({
            message : "Project created successfull",
            success : true,
            data
        })
    } catch (error) {
        res.status(500).json({
            message : error.message,
            success : false
        })
    }
}

const getProjects = async (req, res) => {
    try {
        const userId = req.user
        const data = await Project.find({user: userId, isDefault: false}).sort({ createdAt: 1 })

        res.status(201).json({
            message : "Get Projects successfull",
            success : true,
            data
        })
    } catch (error) {
        res.status(500).json({
            message : error.message,
            success : false
        })
    }
}


module.exports = {createProject, getProjects}