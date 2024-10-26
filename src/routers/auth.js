import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshSessionContoller,
  registerUserCotroller,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserShema, registerUserShema } from '../validation/auth.js';

const userRouter = Router();

userRouter.post(
  '/register',
  validateBody(registerUserShema),
  ctrlWrapper(registerUserCotroller),
);

userRouter.post(
  '/login',
  validateBody(loginUserShema),
  ctrlWrapper(loginUserController),
);

userRouter.post('/logout', ctrlWrapper(logoutUserController));

userRouter.post('/refresh', ctrlWrapper(refreshSessionContoller));

export default userRouter;
