import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacilityIntoDB = async (payload: TFacility) => {
  return await Facility.create(payload);
};
const getFacilityFromDB = async () => {
  return await Facility.find().exec();
};
const getSingleFacilityFromDB = async (id: string) => {
  const result = await Facility.findById(id).exec();

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility data is not found!');
  }
  return result;
};
const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>,
) => {
  const ixExistFacilityData = await Facility.findById(id);
  if (!ixExistFacilityData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility data is not found!');
  }
  return await Facility.findByIdAndUpdate(id, payload, {
    new: true,
  }).exec();
};
const deleteFacilityIntoDB = async (id: string) => {
  const ixExistFacilityData = await Facility.findById(id);
  if (!ixExistFacilityData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility data is not found!');
  }
  return await Facility.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  ).exec();
};

export const FacilityServices = {
  createFacilityIntoDB,
  getFacilityFromDB,
  getSingleFacilityFromDB,
  updateFacilityIntoDB,
  deleteFacilityIntoDB,
};
