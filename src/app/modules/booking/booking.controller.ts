import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';
import { Booking } from './booking.model';

const createBooking = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await BookingServices.createBookingIntoDB(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingFromDB();
  const existsData = await Booking.find();
  if (existsData && existsData.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getUserBooking = catchAsync(async (req, res) => {
  const { user } = req.params;
  const result = await BookingServices.getUserBookingFromDB(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.cancelBookingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking cancelled successfully',
    data: result,
  });
});

// Check availability function
const checkAvailability = catchAsync(async (req, res) => {
  const date = req.query.date ? new Date(req.query.date as string) : new Date();
  const availableSlots = await BookingServices.checkAvailabilityService(date);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability checked successfully',
    data: availableSlots,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBooking,
  getUserBooking,
  cancelBooking,
  checkAvailability,
};
