import { Booking } from '../booking/booking.model';

interface TimeSlot {
  startTime: string;
  endTime: string;
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatTime = (date: Date): string => {
  return date.toTimeString().slice(0, 5);
};

const addHours = (date: Date, hours: number): Date => {
  const newDate = new Date(date.getTime());
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
};

export const findAvailableSlots = async (date: Date) => {
  const dateString = formatDate(date);
  const bookings = await Booking.find({ date: dateString }).exec();
  console.log(bookings);

  const startTime = new Date(date.setHours(8, 0, 0, 0));
  const endTime = new Date(date.setHours(20, 0, 0, 0));

  const availableSlots: TimeSlot[] = [];
  let currentTime = new Date(startTime);

  while (currentTime < endTime) {
    const slotEndTime = addHours(currentTime, 2);

    const isBooked = bookings.some((booking) => {
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);
      return bookingStart < slotEndTime && bookingEnd > currentTime;
    });

    if (!isBooked) {
      availableSlots.push({
        startTime: formatTime(currentTime),
        endTime: formatTime(slotEndTime),
      });
    }

    currentTime = addHours(currentTime, 2);
  }

  return availableSlots;
};
