const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
    logoutUser,
} = require("../../controllers/userController");



const { Router } = require("express");
const { requireLogin } = require("../../middleware/authMIddleware");
const userRouter = Router();



userRouter.post('/',(req,res,next)=>{
  console.log('create User route accessed');
  next(); 
}, createUser); 
userRouter.get("/", getUsers);
userRouter.get("/:id",requireLogin, getUserById);
userRouter.put("/:id",requireLogin, updateUser);
userRouter.delete("/:id",requireLogin, deleteUser); 
userRouter.post("/login", loginUser);
userRouter.get("/logout",requireLogin, logoutUser);


 
module.exports = userRouter;