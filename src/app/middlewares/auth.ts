// import httpStatus from 'http-status';
// import AppError from '../Errors/AppError';
// import catchAsync from '../utils/catchAsync';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import config from '../config';
// import { TUserRole } from '../modules/user/user.interface';

// const auth = (...requiredRoles: TUserRole) => {
//   return catchAsync(async (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) {
//       throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
//     }

//     const decoded = jwt.verify(
//       token,
//       config.JWT_ACCESS_SECRET as string,
//     ) as JwtPayload;
//     const role = decoded.role;

//     if (requiredRoles && requiredRoles.includes(role)) {
//       throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
//     }
//     req.user = decoded as JwtPayload;
//     next();
//   });
// };

// export default auth;
