
// server creation by calling express
const express = require("express")

//importing the user controller
const  usercontroller = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')

//calling the express.Router() for routing
const router = new express.Router(); //use new keyword to call the router


//specifying the method and calling the required controller
router.post('/register', usercontroller.registerController)

router.post('/login',usercontroller.loginController)
                                                          //method to pass files      //from frontend
router.post('/addProject',jwtMiddleware, multerMiddleware.single("projectImg"), projectController.addProjectController)

//to get 3 projects
router.get('/getLimitedProjects', projectController.getLimitedProjectController);


//to get projects inside the dashboard
router.get('/getAllProjects', jwtMiddleware,projectController.getAllProjects)

// to get user specific projects inside the dashboard 
router.get('/getUserProjects', jwtMiddleware,projectController.getUserProjects)

//edited project details
router.put('/editProject/:id',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.editProject)

//delete project details
router.delete('/deleteProject/:id',jwtMiddleware,projectController.deleteProject)

//update profile details using patch
router.patch('/editProfile',jwtMiddleware,usercontroller.updateProfileController)

//server configured in index.js so router should be exported to index.js

module.exports=router;