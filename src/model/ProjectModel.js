import mongoose from "./index.js";

const projectSchema = new mongoose.Schema({
    title:{
    type: String,
    required:[true,'Title is Required']
    },
    subHeading:{
        type:String,
        required:[true,'Sub Heading is Required']
    },
    image:{
        type:String,
        required:true
    },
    projectURL:{
        type:String,
    },
    overView:{
        type:String
    },
    technologies:{
        type:String
    },
    conclusion:{
        type:String
    }

},{
collation:'project',
versionKey:false
})

const projectModel = mongoose.model('project',projectSchema)
export default projectModel