import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { findAvailableSlots } from './checkAvailability.service';

const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const checkAvailabilityController = catchAsync(async (req, res) => {
  const dateParam = req.query.date as string;
  const date = dateParam ? parseDate(dateParam) : new Date();

  const availableSlots = await findAvailableSlots(date);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability checked successfully',
    data: availableSlots,
  });
});

export default checkAvailabilityController;
