import { Router } from "express";
import userService from '../service/userService.js'


const routes = Router()

routes.post('/sent',userService.sendMessage)
routes.post('/project',userService.postProject)
routes.get('/all-projects',userService.getAllProjects)
routes.get('/view-project/:id',userService.viewProjectById)

export default routes