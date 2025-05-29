import express from 'express';
import { loginUser,registerUser,adminLogin, updateUserRanks, getUserDetails, deleteUser, listUsers} from '../backend_logic/userSrc.js';
import auth from '../middleware/auth.js';
import authUser from '../middleware/authUser.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.put('/update-ranks', updateUserRanks);
userRouter.get('/me', authUser, getUserDetails);
userRouter.delete('/ban', deleteUser);
userRouter.get('/list', listUsers)

export default userRouter;