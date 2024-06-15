import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const signUp = catchAsync(async (req, res) => {
  const result = await UserServices.signUpIntoDB(req.body);

  const { _id, name, email: userEmail, role, phone, address } = result;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User SignUp successfully',
    data: {
      _id,
      name,
      email: userEmail,
      role,
      phone,
      address,
    },
  });
});
const login = catchAsync(async (req, res) => {
  const { email: paramEmail, password } = req.body;
  const result = await UserServices.loginFromDB(paramEmail, password);

  const { _id, name, email, role, phone, address } = result.user;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    token: result.accessToken,
    data: { _id, name, email, role, phone, address },
  });
});

export const UserControllers = { signUp, login };
