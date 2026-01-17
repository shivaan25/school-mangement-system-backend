import * as schoolRepo from "./school.repository";

export const createSchool = async (name: string) => {
  return schoolRepo.createSchool({ name });
};

export const getSchool = async () => {
  return schoolRepo.getSchool();
};
