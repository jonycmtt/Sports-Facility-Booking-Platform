import express from 'express';
import checkAvailabilityController from './checkAvailability.Controller';

const router = express.Router();

router.get('/', checkAvailabilityController);

export const AvailabilityRoutes = router;
