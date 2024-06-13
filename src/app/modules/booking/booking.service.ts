import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { Facility } from '../facility/facility.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBookingIntoDB = async (payload: TBooking) => {
  const { facility, date, startTime, endTime, user } = payload;

  const existingFacility = await Facility.findById(facility);
  if (!existingFacility) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found!');
  }
  // Calculate payable amount
  const pricePerHour = existingFacility.pricePerHour;
  const startDate = new Date(date + 'T' + startTime);
  const endDate = new Date(date + 'T' + endTime);
  const durationInHours =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  const payableAmount = durationInHours * pricePerHour;

  return await Booking.create({
    facility: facility,
    date,
    startTime,
    endTime,
    user,
    payableAmount,
  });
};

const getAllBookingFromDB = async () => {
  return await Booking.find();
};
const getUserBookingFromDB = async (user: string) => {
  return await Booking.findOne({ user });
};

const cancelBookingFromDB = async (id: string) => {
  return await Booking.findById(
    id,
    {
      isBooked: 'canceled',
    },
    {
      new: true,
    },
  );
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getUserBookingFromDB,
  cancelBookingFromDB,
};
