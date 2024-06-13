import moment from 'moment';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { checkAvailability } from './checkAvailability.service';

const checkAvailabilityController = catchAsync(async (req, res) => {
  const dateParam = req.query.date as string;
  const date = dateParam
    ? moment(dateParam, 'DD-MM-YYYY').toDate()
    : new Date();

  const availableSlots = await checkAvailability(date);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability checked successfully',
    data: availableSlots,
  });
});

export default checkAvailabilityController;
