import express from 'express';
import { BookingControllers } from '../booking/booking.controller';

const router = express.Router();
router.get('/', BookingControllers.checkAvailability);

export const AvailabilityRoutes = router;
