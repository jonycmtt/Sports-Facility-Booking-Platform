import { TUser } from './user.interface';
import { User } from './user.model';

const signUpIntoDB = async (payload: TUser) => {
  return await User.create(payload);
};
const loginFromDB = async (email: string, password: string) => {
  console.log(email, password, 'login success');
};

export const UserServices = { signUpIntoDB, loginFromDB };
