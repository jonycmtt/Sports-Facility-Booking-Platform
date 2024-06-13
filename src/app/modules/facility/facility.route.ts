import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityValidations } from './facility.validation';
import { FacilityControllers } from './facility.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(FacilityValidations.createFacilityValidationSchema),
  FacilityControllers.createFacility,
);

router.put(
  '/:id',
  validateRequest(FacilityValidations.updateFacilityValidationSchema),
  FacilityControllers.updateFacility,
);
router.get('/', FacilityControllers.getAllFacility);
router.get('/:id', FacilityControllers.getSingleAllFacility);
router.delete('/:id', FacilityControllers.deleteFacility);

export const FacilityRoutes = router;
