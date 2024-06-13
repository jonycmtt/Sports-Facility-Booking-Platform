import moment from 'moment';
import { Booking } from '../booking/booking.model';

export const checkAvailability = async (
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
