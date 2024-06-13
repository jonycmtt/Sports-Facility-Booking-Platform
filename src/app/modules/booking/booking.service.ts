import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { Facility } from '../facility/facility.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import moment from 'moment';

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
  const result = await Booking.find().populate('facility').populate('user');

  return result;
};
const getUserBookingFromDB = async (user: string) => {
  return await Booking.find({ user });
};

const cancelBookingFromDB = async (id: string) => {
  return await Booking.findByIdAndUpdate(
    id,
    {
      isBooked: 'canceled',
    },
    {
      new: true,
    },
  );
};

const checkAvailability = async (
  date: Date,
): Promise<{ startTime: string; endTime: string }[]> => {
  try {
    // Retrieve bookings for the specified date
    const bookings = await Booking.find({ date }).exec();

    // Define the available time slots for a day (e.g., 08:00 to 20:00)
    const startTime = moment(date).startOf('day').add(8, 'hours');
    const endTime = moment(date).startOf('day').add(20, 'hours');

    // Define an array to hold the available time slots
    const availableSlots: { startTime: string; endTime: string }[] = [];

    // Iterate through the day in hourly slots
    const currentTime = startTime.clone();
    while (currentTime.isBefore(endTime)) {
      const slotEndTime = currentTime.clone().add(2, 'hours');

      // Check if the slot is available
      const isBooked = bookings.some((booking) => {
        return (
          moment(booking.startTime).isBefore(slotEndTime) &&
          moment(booking.endTime).isAfter(currentTime)
        );
      });

      if (!isBooked) {
        availableSlots.push({
          startTime: currentTime.format('HH:mm'),
          endTime: slotEndTime.format('HH:mm'),
        });
      }

      // Move to the next slot
      currentTime.add(2, 'hours');
    }

    return availableSlots;
  } catch (error) {
    throw new Error('Error retrieving available slots');
  }
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getUserBookingFromDB,
  cancelBookingFromDB,
  checkAvailability,
};
