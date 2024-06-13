import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacilityIntoDB = async (payload: TFacility) => {
  return await Facility.create(payload);
};
const getFacilityFromDB = async () => {
  return await Facility.find().exec();
};
const getSingleFacilityFromDB = async (id: string) => {
  return await Facility.findById(id).exec();
};
const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>,
) => {
  return await Facility.findByIdAndUpdate(id, payload, {
    new: true,
  }).exec();
};
const deleteFacilityIntoDB = async (id: string) => {
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
