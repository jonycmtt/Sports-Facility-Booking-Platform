import httpStatus from 'http-status';
import AppError from '../Errors/AppError';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import sendResponse from '../utils/sendResponse';

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(',')[1];
    // if the token exists
    if (!token) {
      sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'You have no access to this route',
      });
    }

    // check if the token is valid
    jwt.verify(
      token as string,
      config.JWT_ACCESS_SECRET as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }

        const role = (decoded as JwtPayload).role;

        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            `You are not authorized , because you are a ${role} `,
          );
        }

        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
