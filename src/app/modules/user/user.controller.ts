import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const signUp = catchAsync(async (req, res) => {
  const result = await UserServices.signUpIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User SignUp successfully',
    data: result,
  });
});
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await UserServices.loginFromDB(email, password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    token: result.accessToken,
    data: result.user,
  });
});

export const UserControllers = { signUp, login };
