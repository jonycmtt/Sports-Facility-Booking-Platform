import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import BookingValidationSchema from './booking.validation';
import { BookingControllers } from './booking.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookingValidationSchema),
  BookingControllers.createBooking,
);

router.get('/', BookingControllers.getAllBooking);
router.get('/:user', BookingControllers.getUserBooking);
router.delete('/:id', BookingControllers.cancelBooking);

export const BookingRoutes = router;
