import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { Facility } from '../facility/facility.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBookingIntoDB = async (userId: string, payload: TBooking) => {
  const { facility, date, startTime, endTime } = payload;

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
    user: userId,
    payableAmount,
  });
};

const getAllBookingFromDB = async () => {
  const result = await Booking.find().populate('facility').populate('user');

  return result;
};
const getUserBookingFromDB = async (user: string) => {
  return await Booking.find({ user }).populate('facility');
};

const cancelBookingFromDB = async (id: string) => {
  const ixExistFacilityData = await Booking.findById(id);
  if (!ixExistFacilityData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking data is not found!');
  }

  return await Booking.findByIdAndUpdate(
    id,
    {
      isBooked: 'canceled',
    },
    {
      new: true,
    },
  ).populate('facility');
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getUserBookingFromDB,
  cancelBookingFromDB,
};
