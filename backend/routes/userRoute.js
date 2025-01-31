import express from 'express';
import { loginUser,registerUser,adminLogin, updateUserRanks, getUserDetails} from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import authUser from '../middleware/authUser.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.put('/update-ranks', updateUserRanks);
userRouter.get('/me', authUser, getUserDetails);

export default userRouter;