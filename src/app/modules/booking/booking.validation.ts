import { z } from 'zod';

const BookingValidationSchema = z.object({
  body: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Date must be in YYYY-MM-DD format',
    }),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, {
      message: 'Start time must be in HH:MM format',
    }),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, {
      message: 'End time must be in HH:MM format',
    }),
    facility: z.string(),
    user: z.string(),
  }),
});

export default BookingValidationSchema;
