import userModel from '../model/userModel.js'
import nodemailer, { createTransport } from 'nodemailer'
import 'dotenv/config.js'
import projectModel from '../model/ProjectModel.js'
import mongoose from 'mongoose'

const sendMessage = async(req,res)=>{
    try {
        let {name,email,message} = req.body

        if(!name || !email || !message){
            res.status(403).send({
                message:'All field is Required'
            })
        }

        const newMessage = await userModel({name,email,message})
        await newMessage.save()
        const transport = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            },
        })

        const mailOption = {
            from : process.env.EMAIL_USER,
            to:'essaki078@gmail.com',
            subject: 'New Contact Form Submission',  // Subject line
            html: `<h2>New message from your portfolio website</h2>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong> ${message}</p>`
        };

        await transport.sendMail(mailOption)

        
           return res.status(201).send({
                message:'Your message has been sent successfully',
                data:newMessage
            })

           
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:'Internal Server Error'
        })
    }
}

//projext service

const postProject = async(req,res)=>{
    try {
        let {title,subHeading,image,projectURL,overview,technologies,conclusion} = req.body
        let newProject ={
            title,
            subHeading,
            image,
            projectURL,
            overview,
            technologies,
            conclusion
        }
        let project = await projectModel(newProject)
        await project.save()

        return res.status(201).send({
            message:'Your message has been sent successfully',
            data:project
        })
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:'Internal Server Error'
        })
    }
}


const getAllProjects = async(req,res)=>{
    try {
        const projects = await projectModel.find().collation({
            locale: 'en', // Example locale
            strength: 1 // Example strength
        });

        if(projects.length === 0){
            return res.status(404).send({
                message:'No projects Found'
            })
        }

        return res.status(200).send({
            message:'Projects Fetched Successfully',
            data:projects
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:'Internal Server Error'
        })
    }
}

const viewProjectById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                message: 'Invalid project ID format',
            });
        }

        // Find the project by ID
        const project = await projectModel.findById(id).collation({ locale: 'en' });

        // Check if the project exists
        if (!project) {
            return res.status(404).send({
                message: 'Project not found with this ID',
            });
        }

        // Return the found project
        return res.status(200).send({
            message: 'Project fetched successfully',
            data: project,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Internal Server Error',
        });
    }
};

export default{
    sendMessage,
    postProject,
    getAllProjects,
    viewProjectById
}