import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

const signUpIntoDB = async (payload: TUser) => {
  return await User.create(payload);
};

const loginFromDB = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  const isPasswordMatch = await bcrypt.compare(password, user?.password);

  if (!isPasswordMatch) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'This user password is incorrect!',
    );
  }

  // create token send to client

  const jwtPayload = {
    userId: user._id,
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.JWT_ACCESS_SECRET as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    user,
  };
};

export const UserServices = { signUpIntoDB, loginFromDB };
